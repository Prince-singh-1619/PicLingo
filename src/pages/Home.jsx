import React from 'react'
import { FiUpload } from 'react-icons/fi'
import { GoArrowRight } from 'react-icons/go'
import heroImg from '../assets/text art.jpg'
import { GiSparkles } from 'react-icons/gi'
import { LuLetterText } from 'react-icons/lu'
import { Link } from 'react-router-dom';

const Home = () => {
  const howArray = [
    {
      icon: <FiUpload/>,
      title: 'Upload',
      description: 'Upload your image through our simple and intuitive interface.'
    },
    {
      icon: <GiSparkles/>,
      title: 'Process',
      description: 'Our AI analyzes your image, identifying objects, scenes, emotions, and context.'
    },
    {
      icon: <LuLetterText/>,
      title: 'Recommend',
      description: 'Receive multiple caption suggestions tailored to your image and its context.'
    },
  ]

  return (
    <section className='h-full w-full'>
        {/* hero section */}
        <section className='min-h-[80vh] flex max-md:flex-col-reverse items-center max-md:justify-center px-12 gap-12 max-md:gap-4 my-24 max-md:my-12'>
          <div className='p-12 '>
            <div className='flex flex-col justify-center gap-4 max-md:gap-8'>
              <p className='text-6xl font-bold font-stretch-expanded text-[clamp(2rem,5vw,4rem)] max-md:text-center'>AI-Powered Image Caption Recommendations</p>
              <p className='text-slate-300 text-xl text-[clamp(1rem,2vw,1.5rem)] max-md:text-center'>Upload your images and get intelligent, contextually relevant caption suggestions powered by advanced AI.</p>
              <div className='flex gap-2 max-sm:flex-col max-md:mx-auto'>
                <Link to='/upload' className='btn flex items-center gap-2 text-white/87'>
                  <i className='text-white/87'><FiUpload/></i> 
                  <span className='text-white/87'>Upload Image</span> 
                </Link>
                <Link to='/about' className='btn flex items-center gap-2 text-white/87'>
                  <span className='text-white/87'>Learn More</span> 
                  <i className='text-white/87'><GoArrowRight/></i> 
                </Link>
              </div>
            </div>
          </div>
          <div className='p-12 max-sm:min-w-[360px]'>
            <img src={heroImg} alt='' className='max-lg:max-h-[1240px] max-lg:w-[1240px] rounded-lg'/>
          </div>
        </section>

        {/* How it works */}
        <section className='min-h-[90vh] w-full bg-[#333333] flex flex-col justify-center items-center gap-2 py-4'>
          <p className='text-5xl font-bold text-[clamp(2rem,4vw,3.5rem)]'>How It Works</p>
          <p className='text-xl text-slate-300 text-[clamp(1rem,2vw,1.25rem)] w-[80%] sm:w-[60%] md:w-[55%] text-center'>Our AI-powered system analyzes your images and generates contextually relevant caption suggestions in seconds.</p>
          <div className='flex max-md:flex-col gap-10 w-[75vw] text-center mt-12'>
            {
              howArray.map((data, index)=>{
                return (
                  <div key={index} className='flex flex-col justify-center items-center gap-4'>
                    <div className='h-18 w-18 sm:h-20 sm:w-20 rounded-full flex justify-center items-center text-4xl bg-[#1a1a1a] text-slate-400'>
                      {data.icon}
                    </div>
                    <p className='text-2xl sm:text-3xl font-bold'>{data.title}</p>
                    <p className='text-lg sm:text-xl text-slate-300 text-center max-w-[80%]'>{data.description}</p>
                  </div>
                )
              })
            }
          </div>
        </section>

        {/* Ready to get started */}
        <section className='h-[65vh] w-full flex flex-col justify-center items-center'>
          <p className='text-5xl font-bold text-center'>Ready to Get Started?</p>
          <p className='text-xl text-center text-slate-300 mt-2'>Upload your first image and experience the power of AI-generated caption recommendations.</p>
          <Link to='/upload' className='btn mt-10 flex justify-center items-center gap-2 text-white/87'>
            <i className='text-lg text-white/87'><FiUpload/></i> 
            <span className='text-white/87'>Upload Your Image</span> 
          </Link>
        </section>
    </section>
  )
}

export default Home