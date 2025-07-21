import React, { useEffect, useState } from 'react'
import { FiUpload } from 'react-icons/fi'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { LuImage } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'
import GenerateCaptions from '../helpers/GenerateCaptions'
import imageTobase64 from '../helpers/imageTobase64'
import TypewriterText from '../animations/TypewriterText'
import ColorExtractor from '../components/ColorExtractor'
import SummaryApi from '../helpers/SummaryApi'
import isLoggedIn from '../helpers/isLoggedIn'
import { toast } from 'react-toastify'
// import '../animations/'
import InteractiveCard from '../animations/InteractiveCard'

const Upload = () => {
  const [loading, setLoading] = useState(false)
  const [imageArray, setImageArray] = useState([])
  const [dominantColor, setDominantColor] = useState(null)
  const [invertedColor, setInvertedColor] = useState(null)
  const [capArray, setCapArray] = useState([])
  // const [mood, setMood] = useState("Happy")
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("userData"));
  const authToken = localStorage.getItem("authToken");

  // console.log(mood)
  

  const handleChange = async(e) =>{
    const image = e.target.files[0]
    console.log('image uploaded', image)

    if(image){
      try {
        const color = await ColorExtractor(image)
        console.log('Dominant color:', color)
        // Use this color in your state or UI
        setDominantColor(color)
        console.log('color extracted', dominantColor)
      } catch (error) {
        console.error('Color extraction failed:', error)
      }

      const convert = await imageTobase64(image)
      setImageArray(convert)
    }
  }

  function removeImage(){
    setImageArray([])
  }

  useEffect(() => {
    if (dominantColor) {
      console.log('color extracted (updated):', dominantColor)
      setInvertedColor(getInvertedColor(dominantColor))
      console.log('inverted color extracted (updated):', invertedColor)
    }
  }, [dominantColor])

  const getInvertedColor = (rgbString) =>{
    const [r,g,b] = rgbString.match(/\d+/g).map(Number)
    const opposite = `rgb(${255-r}, ${255-g}, ${255-b})`
    return opposite
  }
  

  const genCaps = async() =>{
    setLoading(true)
    
    const captions = await GenerateCaptions()
    console.log("captions received: ", captions)
    setCapArray(captions)


    // Update upload count if user is logged in
    try {
      if (isLoggedIn()) {
        const response = await fetch(SummaryApi.updateUploadCount.url, {
          method: SummaryApi.updateUploadCount.method,
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: user._id })
        });

        const responseData = await response.json();
        if (responseData.success) {
          console.log('Upload count updated successfully');
        } else {
          console.log('Failed to update upload count:', responseData.message);
        }
      }
    } 
    catch (error) {
      console.error('Error updating upload count:', error);
    }

    // passing data to results page
    navigate('/results', {
      state: {
        image: imageArray, 
        captions: captions, 
        dominantColor: dominantColor, 
        invertedColor: invertedColor
      }
    })
    
    //update user in localStorage
    if(user && user.statistics){
      const updatedUserData = {
        ...user,
        statistics: {
          ...user.statistics,
          uploadCount: (user?.statistics.uploadCount || 0) + 1,
          captionGenerated: (user?.statistics.captionGenerated || 0) + 5
        }
      };

      localStorage.setItem('userData', JSON.stringify(updatedUserData));
      console.log('User stats updated:', updatedUserData);
    }
    
    setLoading(false)
  }
  
  return (
    <section className='h-full w-full flex flex-col jutify-center gap-2 items-center py-15'>
      <div className='text-gradient text-5xl max-sm:text-3xl font-bold text-center'><TypewriterText text="Upload Your Image"/></div>
      <p className='text-xl max-sm:text-sm text-slate-700 dark:text-slate-300 mt-2 text-center'>Upload an image to get AI-powered caption recommendations.</p>

      
      <div className='h-full min-h-[420px]  min-w-[55%] max-sm:w-[95%] border border-slate-700 rounded-lg mt-10 py-4 flex flex-col justify-around items-center gap-4 relative  '>
        
        <InteractiveCard className='p-10 w-[95%] max-sm:w-[90%] border border-dashed border-slate-500 hover:rounded-lg flex justify-center items-center'>
          <div>
            { imageArray.length===0 ? (
                  <div className='flex flex-col justify-center items-center gap-4  '>
                    <div className='h-18 w-18 sm:h-20 sm:w-20 rounded-full flex justify-center items-center text-4xl bg-[#94A3B8] dark:bg-[#322f2f] text-slate-700 dark:text-slate-400'><LuImage/></div>
                    <p className='text-2xl max-sm:text-lg font-bold text-center'>Drag and drop your image here</p>
                    <p className='-mt-2 max-sm:text-xs text-center'>Supports JPG, PNG and GIF files. Max file size 10MB.</p>
                    <label className=''>  
                      <div className='btn flex items-center gap-2 text-lg '>
                        <i><FiUpload/></i>
                        <span>Select File</span>
                      </div> 
                      <input type='file' className='hidden' onChange={handleChange} accept="image/*"/>
                    </label>
                  </div>
              ) : (
                // <div className='bg-red-400 max-sm:w-[80%]  hover:rounded-lg flex justify-center items-center'>
                  <div className='relative'>
                    <div className='absolute -top-2 -right-6 text-2xl cursor-pointer' onClick={removeImage}><IoMdCloseCircleOutline/></div>
                    <div className='max-w-full max-h-56 flex justify-center items-center '>
                      <img src={imageArray} alt='imageArray' className='w-full max-h-56 object-cover'/>
                    </div>
                  </div>
                // </div>
              )
            }
          </div>
        </InteractiveCard>

        {/* <div className='flex max-sm:flex-col items-center gap-2'>
          <span className='opacity-75'>Select a mood:</span>
          <div className='flex gap-2 flex-wrap justify-center'>
            <button onClick={()=>setMood("Happy")} className={`h-5 w-fit p-4 border border-slate-700 rounded flex justify-center items-center cursor-pointer ${mood==="Happy" ? 'bg-white dark:bg-black' : null}`} style={{border:`2px solid ${invertedColor}`}}>Happy</button>
            <button onClick={()=>setMood("Sarcastic")} className={`h-5 w-fit p-4 border border-slate-700 rounded flex justify-center items-center cursor-pointer ${mood==="Sarcastic" ? 'bg-white dark:bg-black' : null}`} style={{border:`2px solid ${invertedColor}`}}>Sarcastic</button>
            <button onClick={()=>setMood("Playful")} className={`h-5 w-fit p-4 border border-slate-700 rounded flex justify-center items-center cursor-pointer ${mood==="Playful" ? 'bg-white dark:bg-black' : null}`} style={{border:`2px solid ${invertedColor}`}}>Playful</button>
          </div> 
        </div> */}

        {/* color spill */}
        {imageArray[0] && <div className="absolute -inset-15 blur-3xl opacity-25 -z-10 rounded-lg" style={{backgroundColor:dominantColor||'transparent', transition:'background-color 2s ease'}}> </div> }


        <button className='w-84 max-sm:w-70 text-center mt-8' style={imageArray.length !== 0 ? { borderRadius: '12px', boxShadow: `0px 0px 10px 0px ${invertedColor}, inset 0px 0px 20px 0px ${invertedColor}` } : {}} >
          {
            imageArray.length !== 0 ? (
              <div onClick={genCaps}>
                <span className='btn block text-gray-900 dark:text-white/87' >Generate Captions</span>
              </div>
            ) : (
              <span className='btn-disabled block'>Generate Captions</span>
            )
          }
        </button>
      </div>
      
      <span className='max-w-[90%] opacity-50 tracking-wider text-center'>For added privacy, we do not store your images</span>

      {/* loading animation */}
      {
        loading ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs ">
            <div className="loader"></div> 
          </div>
        ) : null
      }
      
    </section>
  )
}

export default Upload