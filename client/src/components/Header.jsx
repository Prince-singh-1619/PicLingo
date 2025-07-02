import React, { useEffect, useRef, useState } from 'react'
import { FiUpload } from 'react-icons/fi';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import logo from '../assets/typography-bird.png'
import SummaryApi from '../helpers/SummaryApi';
import {toast} from 'react-toastify'
import { UserContext } from '../context/UserContext';
import userImg from '../assets/user.png'


const Header = ({dp}) => {
  const user = localStorage.getItem("authToken")
  // const {userId} = useContext(UserContext)
  const navigate = useNavigate()
  const [showLogout, setShowLogout] = useState(false);
  const logoutRef = useRef();

  const handleLogout = async() =>{
    // e.preventDefault()
    localStorage.clear();

    const fetchData = await fetch(SummaryApi.userLogout.url, {
      method: SummaryApi.userLogout.method,
      credentials: "include"
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
    }
    document.addEventListener("mousedown", handleClickOutside);
    return()=>{
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleProfileButton = () =>{
    navigate('/my-profile', {state: {}})
  }

  return (
    <section className='fixed w-full h-16 z-10'>
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
        <div className='flex items-center gap-8 max-[360px]:gap-2'>
          <ThemeToggle/>
          <Link to='/upload' className='btn flex items-center gap-2 text-gray-900 dark:text-white/87 max-sm:hidden'>
            <i className='text-gray-900 dark:text-white/87'><FiUpload/></i>
            <span className=' text-gray-900 dark:text-white/87 inline-block'>Upload</span>
          </Link>
          <div>
            { 
              user ? (
                <div className=' inline-block text-gray-900 dark:text-white/87 relative '>
                  <img src={dp || userImg} alt='profile' className='w-10 h-10 object-cover rounded-full cursor-pointer' onClick={()=>setShowLogout((prev)=>!prev)}/>
                  { showLogout && 
                    <div ref={logoutRef} className='btn absolute -ml-10 mt-2 before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:w-5 before:h-5 before:bg-[#94A3B8] dark:before:bg-[#322f2f] before:rotate-45 before:clip-path-[polygon(50%_0%,0%_100%,100%_100%)] flex flex-col items-center gap-2'>
                      <div onClick={handleLogout} className='w-full px-4 text-center hover:bg-[#E2E8F0] dark:hover:bg-[#1a1a1a] transition-colors cursor-pointer'>Logout</div>
                      <div className="h-[1px] w-full bg-gray-300 dark:bg-gray-600 mx-2"></div>
                      <div onClick={handleProfileButton} className='w-full text-center hover:bg-[#E2E8F0] dark:hover:bg-[#1a1a1a] transition-colors cursor-pointer'>My profile</div>
                    </div>
                  }
                </div>
              ) : (
                <Link to='/login'>
                  <span className='btn inline-block text-gray-900 dark:text-white/87'>Login</span>
                </Link>
              ) 
            }
          </div>
          {/* <Link to='/login' className='btn'>
            <span className='inline-block  text-gray-900 dark:text-white/87'>
              {
                user ? ("Logout") : ("Login")
              }
            </span>
          </Link> */}
        </div>
      </div>
      <div className='h-[1px] bg-slate-600 mt-1'></div>
    </section>
  )
}

export default Header