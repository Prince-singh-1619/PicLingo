import React, { useEffect, useRef, useState } from 'react'
import { FiUpload } from 'react-icons/fi';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import logo from '../assets/typography-bird.png'
import SummaryApi from '../helpers/SummaryApi';
import {toast} from 'react-toastify'
import userImg from '../assets/user.png'
import { TbMenuDeep } from "react-icons/tb";
import {motion} from 'motion/react'
import { RiContactsLine } from "react-icons/ri";

const Header = () => {
  // const token = localStorage.getItem("authToken")
  const user = JSON.parse(localStorage.getItem("userData"))
  console.log("user data", user)
  const navigate = useNavigate()
  const [showLogout, setShowLogout] = useState(false);
  const [showMenubar, setShowMenubar] = useState(false)
  const logoutRef = useRef();
  const menuRef = useRef();

  const handleLogout = async() =>{
    // e.preventDefault()
    localStorage.clear();

    const fetchData = await fetch(SummaryApi.userLogout.url, {
      method: SummaryApi.userLogout.method
    })
    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message)
      setShowLogout(false)
      navigate('/')
    }
    if(data.error){
      toast.error(data.message)
    }
  }

  useEffect(()=>{
    const handleClickOutside = (event) =>{
      // event.preventDefault()
      if(logoutRef.current && !logoutRef.current.contains(event.target)){
        setShowLogout(false)
      }
      if(menuRef.current && !menuRef.current.contains(event.target)){
        setShowMenubar(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return()=>{
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])


  return (
    <section className='fixed w-full h-16 z-50'>
      <div className='w-full h-16 backdrop-blur-lg flex items-center absolute'></div>

      <div className='w-full flex justify-between relative px-12 max-md:px-4 py-2'>
        <Link to='/' className='flex justify-center items-center gap-2 max-[375px]:gap-0'>
          <img src={logo} alt='logo' className='w-10 h-10 invert-0 dark:invert'/>
          <span className='text-gray-900 dark:text-white/87 text-4xl font-bold text-gradient'>PicLingo</span>
        </Link>
        <div className='flex items-center gap-8 max-md:hidden'>
          <Link to='/'><span className='text-gray-900 dark:text-white/87'>Home</span></Link>
          <Link to='/upload'><span className='text-gray-900 dark:text-white/87'>Upload</span></Link>
          <Link to='/about'><span className='text-gray-900 dark:text-white/87'>About</span></Link>
        </div>
        <div className='flex items-center gap-6 max-[360px]:gap-2'>
          <ThemeToggle/>
          <Link to='/upload' className='btn bg-[#1a1a1a] flex items-center gap-2 text-gray-900 dark:text-white/87 max-sm:hidden'>
            <i className='text-gray-900 dark:text-white/87'><FiUpload/></i>
            <span className=' text-gray-900 dark:text-white/87 inline-block'>Upload</span>
          </Link>
          <div>
            { 
              user ? (
                <div className=' inline-block text-gray-900 dark:text-white/87 relative '>
                  <img src={user?.profilePic || userImg} alt='profile' className='w-10 h-10 object-cover rounded-full cursor-pointer' onClick={()=>setShowLogout((prev)=>!prev)}/>
                  { showLogout && 
                    <motion.div ref={logoutRef} 
                      initial={{y:-25}} 
                      animate={{y:0}} 
                      transition={{duration:0.3,}}
                      style={{zIndex:0}}
                    className='btn absolute -ml-10 max-md:-ml-18 mt-2 before:absolute before:-top-2 before:left-1/2 max-md:before:left-[75%] before:-translate-x-1/2 before:w-5 before:h-5 before:bg-[#94A3B8] dark:before:bg-[#322f2f] before:rotate-45 before:clip-path-[polygon(50%_0%,0%_100%,100%_100%)] flex flex-col items-center gap-2'>
                      <Link to={'/upload'} className='w-full text-center hidden max-md:block hover:bg-[#E2E8F0] dark:hover:bg-[#5c5c5c] transition-colors cursor-pointer'>Upload</Link>
                      <div className="h-[1px] w-full hidden max-md:block bg-gray-300 dark:bg-gray-600 mx-2"></div>
                      <Link to={'/about'} className='w-full text-center hidden max-md:block hover:bg-[#E2E8F0] dark:hover:bg-[#5c5c5c] transition-colors cursor-pointer'>About</Link>
                      <div className="h-[1px] w-full hidden max-md:block bg-gray-300 dark:bg-gray-600 mx-2"></div>
                      <Link to={'/contact-us'} className='w-full flex gap-2 min-w-20 text-center hover:bg-[#E2E8F0] dark:hover:bg-[#5c5c5c] transition-colors cursor-pointer'>Contact Us</Link>
                      <div className="h-[1px] w-full bg-gray-300 dark:bg-gray-600 mx-2"></div>
                      <Link to={'my-profile'} className='w-full text-center hover:bg-[#E2E8F0] dark:hover:bg-[#5c5c5c] transition-colors cursor-pointer'>My profile</Link>
                      <div className="h-[1px] w-full bg-gray-300 dark:bg-gray-600 mx-2"></div>
                      <div onClick={handleLogout} className='w-full px-4 text-center hover:bg-[#E2E8F0] dark:hover:bg-[#5c5c5c] transition-colors cursor-pointer'>Logout</div>
                    </motion.div>
                  }
                </div>
              ) : (
                <Link to='/login'>
                  <span className='btn inline-block max-[425px]:hidden text-gray-900 dark:text-white/87'>Login</span>
                </Link>
              ) 
            }
          </div>
          {!user && <div onClick={()=>setShowMenubar((prev)=>!prev)} className='hidden max-md:block relative cursor-pointer'>
            <TbMenuDeep className='text-2xl font-md'/>
            {showMenubar && 
              <motion.div ref={menuRef} 
                initial={{y:-25}} 
                animate={{y:0}} 
                transition={{duration:0.3,}}
                style={{zIndex:0}}
              className='btn-2 absolute -ml-22 mt-2 before:absolute before:-top-2 before:left-[85%] before:-translate-x-1/2  before:w-5 before:h-5 before:bg-[#94A3B8] dark:before:bg-[#1c1c1c] before:rotate-45 before:clip-path-[polygon(50%_0%,0%_100%,100%_100%)] flex flex-col items-center gap-2'>
                <Link to={'/upload'} className='w-full text-center hover:bg-[#E2E8F0] dark:hover:bg-[#5c5c5c] transition-colors cursor-pointer'>Upload</Link>
                <div className="h-[1px] w-full bg-gray-300 dark:bg-gray-600 mx-2"></div>
                <Link to={'/about'} className='w-full text-center hover:bg-[#E2E8F0] dark:hover:bg-[#5c5c5c] transition-colors cursor-pointer'>About</Link>
                <div className="h-[1px] w-full bg-gray-300 dark:bg-gray-600 mx-2"></div>
                <Link to={'/contact-us'} className='w-full min-w-20 text-center hover:bg-[#E2E8F0] dark:hover:bg-[#5c5c5c] transition-colors cursor-pointer'>Contact Us</Link>
                <div className="h-[1px] w-full bg-gray-300 dark:bg-gray-600 mx-2"></div>
                <Link to={'/my-profile'} className='w-full text-center hover:bg-[#E2E8F0] dark:hover:bg-[#5c5c5c] transition-colors cursor-pointer'> {user ? "My profile" : null} </Link>
                {user && <div className="h-[1px] w-full bg-gray-300 dark:bg-gray-600 mx-2"></div>}
                {!user && <Link to={'/login'} className='w-full px-4 text-center hover:bg-[#E2E8F0] dark:hover:bg-[#5c5c5c] transition-colors cursor-pointer'>Log In</Link>}
                {user && <div onClick={handleLogout} className='w-full px-4 text-center hover:bg-[#E2E8F0] dark:hover:bg-[#5c5c5c] transition-colors cursor-pointer'>Logout</div>}
              </motion.div>
            }
          </div>}
          
        </div>
      </div>
      <div className='h-[1px] bg-slate-600 mt-1'></div>
    </section>
  )
}

export default Header