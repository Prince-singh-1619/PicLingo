import React from 'react'

const Footer = () => {
  return (
    <div className='w-full'>
      <div className='h-[1px] bg-slate-600'></div>
      <div className='h-12 flex max-md:flex-col justify-between items-center px-16 text-sm text-slate-700 dark:text-slate-300 max-md:gap-4'>
        <div className='max-md:w-[90vw] max-md:text-center'>&copy; 2025 PicLingo. All rights reserved.</div>
        <div className='flex gap-8'>
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}

export default Footer