import React from 'react'
import aboutImg from '../assets/photo-about.avif'
import { FiUpload } from 'react-icons/fi'
import { GiSparkles } from 'react-icons/gi'
import { LuBrainCircuit, LuZap } from 'react-icons/lu'
import { FaEnvelopeOpenText } from 'react-icons/fa'
import { SlPeople } from 'react-icons/sl'
import { Link } from 'react-router-dom'

const About = () => {
  const worksArray = [
    {
      icon: <FiUpload/>,
      iconTitle: "Upload",
      desc: "Upload your image through our simple and intuitive interface."
    },
    {
      icon: <LuBrainCircuit/>,
      iconTitle: "Analyze",
      desc: "Our AI analyzes your image, identifying objects, scenes, emotions, and context."
    },
    {
      icon: <GiSparkles/>,
      iconTitle: "Generate",
      desc: "The system generates multiple caption options based on the image analysis."
    },
    {
      icon: <FaEnvelopeOpenText/>,
      iconTitle: "Choose",
      desc: "You select the caption that best fits your needs or use our suggestions as inspiration."
    }
  ]
  const featuresArray =[
    {
      icon: <LuZap/>,
      iconName: "Instant Results",
      desc: "Get caption suggestions in seconds, no matter how complex your image is."
    },
    {
      icon: <LuBrainCircuit/>,
      iconName: "Contextual Understanding",
      desc: "Our AI understands the context, mood, and elements in your image for relevant captions."
    },
    {
      icon: <SlPeople/>,
      iconName: "Audience Focused",
      desc: "Captions are designed to engage your audience and increase social media interaction."
    },
  ]

  return (
    <section className='w-screen mt-24 overflow-x-hidden '>
      <p className='text-5xl font-bold text-center'>About PicLingo</p>
      <p className='max-w-[80%] sm:max-w-[50%] text-xl text-center text-slate-700 dark:text-slate-300 mt-2 mx-auto py-2'>Our AI-powered image caption recommendation system helps content creators, marketers, and social media enthusiasts generate engaging captions for their images.</p>

      {/* our mission */}
      <section className='w-[90%] mx-auto flex max-md:flex-col justify-around max-md:items-center py-10 max-md:gap-8'>
        <div className='w-1/2 max-md:w-[75%] flex flex-col justify-around max-md:gap-2'>
          <p className=' text-2xl font-bold max-md:text-center'>Our Mission</p>
          <p className='text-slate-700 dark:text-slate-300 max-md:text-center '>We believe that every image tells a story, and the right caption can enhance that story. Our mission is to help you find the perfect words to complement your visual content, saving you time and boosting engagement.</p>
          <p className=' text-2xl font-bold max-md:text-center'>How It Works</p>
          {
            worksArray.map((data, index)=>{
              return(
                <div key={index} className='flex max-md:flex-col items-center gap-2'>
                  <div className='w-12 h-12 rounded-full flex justify-center items-center bg-[#64748B] dark:bg-[#202020] text-slate-700 dark:text-slate-400'>
                    <i className='text-xl'>{data.icon}</i>
                  </div>
                  <div>
                    <p className='text-lg font-bold max-md:text-center'>{data.iconTitle}</p>
                    <p className='text-sm font-sm text-slate-700 dark:text-slate-300 max-md:text-center'>{data.desc}</p>
                  </div>
                </div>
              )
            })
          }
        </div> 

        <div className='max-w-[620px] max-h-[480px] overflow-hidden rounded-lg object-scale-down'>
          <img src={aboutImg} alt='' className='w-full object-contain'/>
        </div>
      </section>

      {/* key features */}
      <section className='w-[90%] mx-auto py-8'>
        <p className='text-2xl font-bold text-center'>Key Features</p>
        <div className='py-4 mt-4 flex max-md:flex-col justify-around items-around max-md:items-center max-md:gap-4'>  
          {
            featuresArray.map((data, index)=>{
              return(
                <div key={index} className='w-[30%] max-md:w-[80%] bg-slate-300 dark:bg-[#202020] border border-slate-700 rounded-lg flex flex-col justify-around gap-2 p-6'>
                  <div className='h-12 w-12 rounded-full flex justify-center items-center bg-[#64748B] dark:bg-[#1a1a1a] text-slate-700 dark:text-slate-400'>
                    <i className='text-3xl '>{data.icon}</i>
                  </div>
                  <p className='text-xl font-bold'>{data.iconTitle}</p>
                  <p className='text-slate-700 dark:text-slate-300'>{data.desc}</p>
                </div>
              )
            })
          }
        </div>
      </section>

      {/* Ready to try it */}
      <section className='min-w-[40%] mx-auto flex flex-col gap-4 justify-center items-center py-10 mb-10'>
        <p className='text-2xl font-bold text-center'>Ready to Try It?</p>
        <p className='text-slate-700 dark:text-slate-300 text-center max-w-[80%]'>Upload your first image and experience the power of AI-generated caption recommendations.</p>
        <Link to='/upload' className='btn w-[40%] max-w-[420px] max-sm:w-[60%] flex justify-center items-center gap-2 text-gray-900 dark:text-white/87'>
          <i className='text-gray-900 dark:text-white/87'><FiUpload/></i>
          <p className=' text-gray-900 dark:text-white/87 '>Get Started</p>
        </Link>
      </section>
    </section>
  )
}

export default About