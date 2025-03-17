import React, { useState } from 'react'
import { FiUpload } from 'react-icons/fi'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { LuImage } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'

const Upload = () => {
  const [imageArray, setImageArray] = useState([])
  const navigate = useNavigate();

  // const handleChange = (e) =>{
  //   const image = e.target.files[0]
  //   console.log('image uploaded', image)
  //   if(image){
  //     const imageURL = URL.createObjectURL(image)
  //     setImageArray([imageURL])
  //   }
  // }
  const handleChange = (e) =>{
    const image = e.target.files[0]
    console.log('image uploaded', image)

    if(image){
      const reader = new FileReader()
      reader.readAsDataURL(image) //convert to Base64
      reader.onloadend = () =>{
        setImageArray(reader.result) //store Base64 string
      }
    }
  }

  function removeImage(){
    setImageArray([])
  }

  const genCaps = () =>{
    navigate('/results', {state: {message: imageArray}})
  }
  
  return (
    <section className='h-full w-full flex flex-col jutify-center gap-2 items-center py-15'>
      <p className='text-5xl max-sm:text-3xl font-bold text-center'>Upload Your Image</p>
      <p className='text-xl max-sm:text-sm text-slate-700 dark:text-slate-300 mt-2 text-center'>Upload an image to get AI-powered caption recommendations.</p>
      <div className='min-h-[420px] max-sm:h-[500px] min-w-[55%] max-sm:w-[95%] border border-slate-700 rounded-lg mt-10 flex flex-col justify-around items-center gap-4'>
        <div className='p-10 w-[95%] max-sm:w-[80%] border border-dashed border-slate-500 rounded-lg flex justify-center items-center'>
          {
            imageArray.length===0 ? (
                <div className='flex flex-col justify-center items-center gap-4  '>
                  <div className='h-18 w-18 sm:h-20 sm:w-20 rounded-full flex justify-center items-center text-4xl bg-[#94A3B8] dark:bg-[#1a1a1a] text-slate-700 dark:text-slate-400'><LuImage/></div>
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
              <div className='relative'>
                <div className='absolute -top-2 -right-6 text-2xl cursor-pointer' onClick={removeImage}><IoMdCloseCircleOutline/></div>
                <div className='max-w-full max-h-56 flex justify-center items-center '>
                  <img src={imageArray} alt='imageArray' className='w-full max-h-56 object-contain'/>
                </div>
              </div>
            )
          }
        </div>

        <button className='w-84 max-sm:w-70 text-center'>
          {
            imageArray.length !== 0 ? (
              <div onClick={genCaps}><span className='btn block text-gray-900 dark:text-white/87'>Generate Captions</span></div>
            ) : (
              <span className='btn-disabled block'>Generate Captions</span>
            )
          }
        </button>
      </div>
    </section>
  )
}

export default Upload