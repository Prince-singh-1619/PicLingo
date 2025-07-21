import React, { useEffect, useState } from 'react'
import { BiLike, BiSolidLike } from 'react-icons/bi'
import { RiTranslateAi2 } from "react-icons/ri";
import { GrRevert } from "react-icons/gr";
import { FaCheck } from 'react-icons/fa'
import { LuCopy } from 'react-icons/lu'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SummaryApi from '../helpers/SummaryApi'
import {motion} from 'motion/react'
import TypewriterText from '../animations/TypewriterText';
import PartyBlaster from '../animations/PartyBlaster';
import isLoggedIn from '../helpers/isLoggedIn';
import { toast } from 'react-toastify'
import GenerateCaptions from '../helpers/GenerateCaptions';

const Results = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const {image, captions, dominantColor,  invertedColor} = location.state || {}

  const [capArray, setCapArray] = useState(null)
  useEffect(()=>{
    if(captions){
      setCapArray(captions)
    }
  }, [captions])
  console.log('capArray Received: ', captions)

  const [loading, setLoading] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [likedIndex, setLikedIndex] = useState([])
  const [capSaved, setCapSaved] = useState([])
  const [translatedTexts, setTranslatedTexts] = useState([])
  const [translatedIndex, setTranslatedIndex] = useState([])
  
  const authToken = localStorage.getItem("authToken")
  const user = JSON.parse(localStorage.getItem("userData"))
  const userId = user?._id

  const copyText = async(text, index) =>{
    try{
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(()=>setCopiedIndex(null), 2000)
    }
    catch(err){
      console.error("Error copying text", err)
    }
  }

  const handleLike = async(event, index) =>{
    if(!isLoggedIn()){
      toast.warning("Please login")
      return 
    }

    try{
      setLikedIndex((prev)=>
        prev.includes(index) ? prev.filter((i)=>i!==index) : [...prev, index]
      //.filter() creates a new array containing only elements not equal to index.
      )

      // setCapSaved((prev)=>{
      //   if(!prev.includes(index)) {
      //     saveCaption(event, index);
      //     return [...prev, index]
      //   }
      //   return prev
      // })

      if (!capSaved.includes(index)) {
        const success = await saveCaption(event, index);
        if(success){
          setCapSaved(prev => [...prev, index]);
          
          // Increment totalLikes in user statistics
          try {
              const response = await fetch(SummaryApi.incrementTotalLikes.url, {
                method: SummaryApi.incrementTotalLikes.method,
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: userId })
              });
              const responseData = await response.json();
              if (responseData.success) {
                  console.log('Total likes incremented successfully');
              } else {
                  console.log('Failed to increment total likes:', responseData.message);
              }
          } catch (error) {
              console.error('Error incrementing total likes:', error);
          }

          //update user in localStorage
          if(user && user.statistics){
            const updatedUserData = {
              ...user,
              statistics: {
                ...user.statistics,
                totalLikes: (user?.statistics.totalLikes || 0) + 1,
              }
            };
            localStorage.setItem('userData', JSON.stringify(updatedUserData));
            console.log('User stats updated:', updatedUserData);
          }

        }
      }
    }
    catch(error){
      console.error("Error occurred in liking caption ", error)
    }
  }

  const saveCaption = async(event, index) =>{
    event.preventDefault();
    if(!isLoggedIn()){
      toast.warning("Please login")
      return 
    }

    try{
      const data = {caption:capArray.title[index], tags:capArray.keywords, userId:userId}

      const dataResponse = await fetch(SummaryApi.saveCaptions.url, {
        method : SummaryApi.saveCaptions.method,
        headers: {
          'Authorization': `Bearer ${authToken}`,
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(data),
      })
      const dataApi = await dataResponse.json()
      console.log("dataApi at saveCaption", dataApi)

      if(dataApi.success){
        console.log(dataApi.message)
        return true
      }
      if(dataApi.error){
        console.log("Error while saving caption", dataApi.message)
        return false
      }
    } 
    catch(error){
      console.error("Error occurred in storing caption ", error)
      return false
    }
  }

  const translateText = async(text) =>{
    console.log("called")
    try {
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|hi`);
      //for other language translation, change langCode in API
      const data = await res.json();
      return data.responseData.translatedText;
    } 
    catch (err) {
      console.error('Translation error', err)
      return text  
    }
  }

  const handleTranslate = async(event, index, originalText) =>{
    // const originalText = capArray[index].title

    if(translatedIndex.includes(index)){
      //Toggle back to original
      setTranslatedIndex((prev)=> prev.filter((i)=>i!==index) )
    }
    else{
      try {
        const translated = await translateText(originalText) // hi -> hindi
        setTranslatedTexts((prev) =>({ ...prev, [index] : translated }))
        setTranslatedIndex(prev => [...prev, index])
      } 
      catch (err) {
        console.error("Translation failed", err)  
      }
    }
    
    // try {
    //   const translated = await translateText(originalText, 'hi') // hi -> hindi
    //     console.log("translated text:", translated)
    //   setTranslatedTexts((prev) =>({ ...prev, [index] : translated }))
    //   setTranslatedIndex((prev)=>prev.includes(index) ? prev.filter((i)=>i!==index) : [...prev, index])
    // } catch (err) {
    //   console.log("Some error occured while translating", err)
    // }
  }

  const handleNavigate = () =>{
    if(!isLoggedIn()) {
      toast.warning("Please login")
      return
    }
    navigate('/most-liked-captions')
  }

  // const genCaps = async() =>{
  //   setLoading(true)
  //   const captions = await GenerateCaptions()
  //   setCapArray(captions)


  //   // Update upload count if user is logged in
  //   try {
  //     if (isLoggedIn()) {
  //       const response = await fetch(SummaryApi.updateUploadCount.url, {
  //         method: SummaryApi.updateUploadCount.method,
  //         headers: {
  //           'Authorization': `Bearer ${authToken}`,
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({ userId: user._id })
  //       });

  //       const responseData = await response.json();
  //       if (responseData.success) {
  //         console.log('Upload count updated successfully');
  //       } else {
  //         console.log('Failed to update upload count:', responseData.message);
  //       }
  //     }
  //   } 
  //   catch (error) {
  //     console.error('Error updating upload count:', error);
  //   }

  //   navigate('/results', {
  //     state: {
  //       image:imageArray, 
  //       capArray:capArray, 
  //       dominantColor:dominantColor, 
  //       invertedColor:invertedColor
  //     }
  //   })
    
  //   //update user in localStorage
  //   if(user && user.statistics){
  //     const updatedUserData = {
  //       ...user,
  //       statistics: {
  //         ...user.statistics,
  //         uploadCount: (user?.statistics.uploadCount || 0) + 1,
  //         captionGenerated: (user?.statistics.captionGenerated || 0) + 5
  //       }
  //     };

  //     localStorage.setItem('userData', JSON.stringify(updatedUserData));
  //     console.log('User stats updated:', updatedUserData);
  //   }
    
  //   setLoading(false)
  // }


  // const keywordsArray = [ "Mountain", "cloud", "Rooftop", "Rain", "Travel", "Happy" ]
  // const capArray = [
  //   {
  //     id: '1',
  //     title: "A serene mountain landscape with a crystal clear lake reflecting the snow-capped peaks",
  //   },
  //   {
  //     id: '2',
  //     title: "Majestic mountains rising above a tranquil alpine lake at sunset",
  //   },
  //   {
  //     id: '3',
  //     title: "Nature's mirror: perfect mountain reflections in a pristine lake",
  //   },
  //   {
  //     id: '4',
  //     title: "Breathtaking view of mountain ranges surrounding a peaceful lake",
  //   },
  //   {
  //     id: '5',
  //     title: "The calm waters of a mountain lake perfectly mirroring the surrounding peaks",
  //   },
  // ]


  return (
    <section className='w-full flex flex-col jutify-center gap-2 items-center py-15'>
      <PartyBlaster />
      <p className='text-5xl max-sm:text-3xl font-bold text-center'>Caption Recommendations</p>
      <p className='text-xl max-sm:text-sm text-slate-700 dark:text-slate-300 mt-2 text-center max-sm:w-[80%]'>Here are AI-generated caption suggestions for your image.</p>

      <section className='h-full py-10'>
        <div className='h-full w-[55vw] max-lg:w-[80vw] max-md:w-[100vw] flex justify-around gap-8 max-lg:flex-col max-lg:items-center'>

          {/* image part */}
          <div className='h-full w-[38%] max-lg:w-[90%] border border-slate-700 rounded-lg relative' >
            <div className='p-2'>
              <img src={image} alt='image' className='mx-auto rounded-lg'/>
            </div>
            {/* keywords */}
            <div className='p-2 opacity-75'>KeyWords:</div>
            <div className='p-2 flex gap-2 w-contain w-full flex-wrap'>
              { capArray?.keywords?.length && 
                capArray.keywords.map((data, index)=>{
                  return(
                    <span key={index} className='h-5 w-fit p-4 border border-slate-700 rounded flex justify-center items-center' style={{border:`2px solid ${invertedColor}`}}>{data}</span>
                  )
                })
              }
            </div>

            {/* color spill */}
            <div className="absolute -inset-15 blur-3xl opacity-25 -z-10 transition-all duration-1500 rounded-lg" style={{backgroundColor:dominantColor||'transparent'}}> </div>
            
          </div>

          {/* caption part */}
          <div className='h-fit w-[57%] max-lg:w-[75%] max-sm:w-[90vw] border border-slate-700 rounded-lg p-4'>
            <span className='pt-4 text-2xl font-bold text-gradient'><TypewriterText text="Suggested Captions"/> </span>
            <div className='flex flex-col gap-4 mt-4'>
              {
                capArray?.title?.length ? (
                  capArray.title.map((data, index)=>{
                    return(
                      <motion.div key={index} initial={{y:-index*(150)}} 
                        animate={{y:index*0}} 
                        transition={{duration:1, delay:index*1/3,}}
                        style={{zIndex: data.length-index, border:`1px solid ${invertedColor}`}}
                        className='border rounded-lg p-4 flex flex-col gap-4 bg-[#E2E8F0] dark:bg-[#1a1a1a]'>
                        <p className='text-slate-700 dark:text-slate-300' value={data}>{translatedIndex.includes(index) ? translatedTexts[index]: data}</p>
                        
                        {/* <div className='opacity-75 max-md:w-full max-md:ml-4'><span>KeyWords/Category:</span></div>
                        <div className='p-1 flex gap-2 w-contain w-full flex-wrap'>
                          {
                            capArray.map((data, index)=>{
                              return(
                                <span key={index} className='h-5 w-fit p-1 border border-slate-600 rounded flex justify-center items-center'>{data.keywords}</span>
                              )
                            })
                          }
                        </div> */}
                        
                        <div className='flex justify-between max-sm:flex-row-reverse'>
                          <div className='flex gap-6 max-sm:hidden'>
                            <i className='h-10 w-10 border border-slate-700 hover:text-white flex justify-center items-center text-lg rounded-lg hover:dark:bg-gray-700 cursor-pointer transition-all' onClick={(e)=>handleLike(e,index)}>
                              {
                                likedIndex.includes(index) ? (<BiSolidLike/>) : (<BiLike/>)
                              }
                            </i>
                            <i className='h-10 w-10 border border-slate-700 hover:text-white flex justify-center items-center text-lg rounded-lg hover:dark:bg-gray-700 cursor-pointer transition-all' onClick={(e)=>handleTranslate(e,index, data)} title='translate'> 
                              {
                                translatedIndex.includes(index) ? (<GrRevert/>) : (<RiTranslateAi2/>)
                              } 
                            </i>
                          </div>
                          <div className='flex gap-2 items-center btn btn-copy hover:bg-white '>
                          {/* <div className='flex gap-2 items-center border border-slate-700 px-4 rounded-lg hover:bg-gray-700 cursor-pointer transition-all max-sm:h-12'> */}
                            <i id='copy-icon'>{copiedIndex===index ? (<FaCheck/>) : (<LuCopy/>)}</i>
                            <p id='copy-text' className='text-slate-700 dark:text-slate-300 ' onClick={()=>copyText(data, index)}>{copiedIndex===index ? ('Copied') : ('Copy')}</p>
                          </div>
                        </div>
                      </motion.div> 
                    )
                  })
                ) : (
                  <div>No data found</div>
                ) 
              }
            </div>

          </div>
        </div>
      </section>

      <div className='flex gap-4 max-md:flex-col'>
        <Link to='/upload' className='btn w-fit min-w-56 text-center '>
          <div className='text-gray-900 dark:text-white/87'>Upload Another Image</div>
        </Link>
        {/* <button onClick={genCaps} className='btn w-fit min-w-56 text-center '>
          <div className='text-gray-900 dark:text-white/87'>Generate More</div>
        </button> */}
        <button onClick={handleNavigate} className='btn w-fit min-w-56 text-center '>
          <div className='text-gray-900 dark:text-white/87'>Most liked Captions</div>
        </button>
      </div>

      {/* <div className='flex gap-4 max-[560px]:flex-col'>
        <Link to='/upload' className='btn w-[25%] max-lg:w-[50%] min-w-[240px] text-center '>
          <div className='text-gray-900 dark:text-white/87'>Upload Another Image</div>
        </Link>
        
        <button onClick={handleNavigate} className='btn w-[25%] max-lg:w-[50%] min-w-[240px] text-center '>
          <div className='text-gray-900 dark:text-white/87'>Most liked Captions</div>
        </button>
      </div> */}


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

export default Results
