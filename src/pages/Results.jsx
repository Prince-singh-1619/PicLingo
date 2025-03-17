import React, { useState } from 'react'
import { BiDislike, BiLike } from 'react-icons/bi'
import { FaCheck } from 'react-icons/fa'
import { LuCopy } from 'react-icons/lu'
import { Link, useLocation } from 'react-router-dom'

const Results = () => {
  const location = useLocation()
  const image = location.state?.message
  console.log('image Received', image)

  const [copiedIndex, setCopiedIndex] = useState(null)
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

  const capArray = [
    {
      id: '1',
      title: "A serene mountain landscape with a crystal clear lake reflecting the snow-capped peaks",
    },
    {
      id: '2',
      title: "Majestic mountains rising above a tranquil alpine lake at sunset",
    },
    {
      id: '3',
      title: "Nature's mirror: perfect mountain reflections in a pristine lake",
    },
    {
      id: '4',
      title: "Breathtaking view of mountain ranges surrounding a peaceful lake",
    },
    {
      id: '5',
      title: "The calm waters of a mountain lake perfectly mirroring the surrounding peaks",
    },
  ]



  return (
    <section className='w-full flex flex-col jutify-center gap-2 items-center py-15'>
      <p className='text-5xl max-sm:text-3xl font-bold text-center'>Caption Recommendations</p>
      <p className='text-xl max-sm:text-sm text-slate-700 dark:text-slate-300 mt-2 text-center max-sm:w-[80%]'>Here are AI-generated caption suggestions for your image.</p>

      <section className='h-full py-10'>
        <div className='h-full w-[55vw] max-lg:w-[80vw] max-md:w-[100vw] flex justify-around gap-8 max-lg:flex-col max-lg:items-center'>
          {/* image part */}
          <div className='h-full w-[38%] max-lg:w-[90%] border border-slate-700 rounded-lg'>
            <div className='p-2'>
              <img src={image} alt='image' className='mx-auto rounded-lg'/>
            </div>
          </div>

          {/* caption part */}
          <div className='h-fit w-[57%] max-lg:w-[75%] border border-slate-700 rounded-lg p-4'>
            <p className='text-2xl font-bold '>Suggested Captions</p>
            <div className='flex flex-col gap-4 mt-4'>
              {
                capArray.length ? (
                  capArray.map((data, index)=>{
                    return(
                      <div key={index} className='border border-slate-700 rounded-lg p-4 flex flex-col gap-4'>
                        <p className='text-slate-700 dark:text-slate-300' value={data.title}>{data.title}</p>
                        <div className='flex justify-between max-sm:flex-row-reverse'>
                          <div className='flex gap-6 max-sm:hidden'>
                            <i className='h-10 w-10 border border-slate-700 hover:text-white flex justify-center items-center text-lg rounded-lg hover:dark:bg-gray-700 cursor-pointer transition-all'><BiLike/></i>
                            <i className='h-10 w-10 border border-slate-700 hover:text-white flex justify-center items-center text-lg rounded-lg hover:dark:bg-gray-700 cursor-pointer transition-all'><BiDislike/></i>
                          </div>
                          <div className='flex gap-2 items-center btn btn-copy hover:bg-white '>
                          {/* <div className='flex gap-2 items-center border border-slate-700 px-4 rounded-lg hover:bg-gray-700 cursor-pointer transition-all max-sm:h-12'> */}
                            <i id='copy-icon'>{copiedIndex===index ? (<FaCheck/>) : (<LuCopy/>)}</i>
                            <p id='copy-text' className='text-slate-700 dark:text-slate-300 ' onClick={()=>copyText(data.title, index)}>{copiedIndex===index ? ('Copied') : ('Copy')}</p>
                          </div>
                        </div>
                      </div> 
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

      <Link to='/upload' className='btn w-[25%] max-lg:w-[50%] min-w-[240px] text-center '>
        <div className='text-gray-900 dark:text-white/87'>Upload Another Image</div>
      </Link>
    </section>
  )
}

export default Results
