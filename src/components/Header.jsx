import React from 'react'
import { FiUpload } from 'react-icons/fi';
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <section className='fixed w-full h-16 z-10'>
      <div className='w-full h-16 backdrop-blur-lg flex items-center absolute'></div>

      <div className='w-full flex justify-between relative px-12 max-md:px-4 py-2'>
        <div >
          <Link to='/'> <span className='text-gray-900 dark:text-white/87 text-4xl font-bold'>PicLingo</span> </Link>
        </div>
        <div className='flex items-center gap-8 max-md:hidden'>
          <Link to='/'><span className='text-gray-900 dark:text-white/87'>Home</span></Link>
          <Link to='/upload'><span className='text-gray-900 dark:text-white/87'>Upload</span></Link>
          <Link to='/about'><span className='text-gray-900 dark:text-white/87'>About</span></Link>
          {/* <Link to='/results'><span className='text-gray-900 dark:text-white/87'>Results</span></Link> */}
        </div>
        <div className='flex items-center gap-8'>
          {/* <div className='text-2xl'><MdDarkMode/></div> */}
          {/* <div className='text-2xl'><MdLightMode/></div> */}
          <ThemeToggle/>
          <Link to='/upload' className='btn flex items-center gap-2 text-gray-900 dark:text-white/87 max-sm:hidden'>
            <i className='text-gray-900 dark:text-white/87'><FiUpload/></i>
            <span className=' text-gray-900 dark:text-white/87 inline-block'>Upload</span>
          </Link>
        </div>
      </div>
      <div className='h-[1px] bg-slate-600'></div>
    </section>
  )
}

export default Header