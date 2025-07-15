import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Carousel from '../components/Carousel'
import img1 from '../assets/crsl-l1.jpg'
import img2 from '../assets/crsl-l2.jpg'
import img3 from '../assets/crsl-l3.jpg'
import imgWelcome from '../assets/welcome-2.jpg'
import SummaryApi from '../helpers/SummaryApi'
import { toast } from 'react-toastify'
import { UserContext } from '../context/UserContext'
import { FcGoogle } from 'react-icons/fc'
import GoogleLogin from '../components/GoogleLogin'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    // const {setUserId} = useContext(UserContext)

    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const navigate = useNavigate()
    const images = [img1, img3, img2, imgWelcome]

    const handleOnChange = (e) =>{
        const {name, value} = e.target
        setData((prev)=>{
            return {
                ...prev,
                [name] : value
            }
        })
    }
    const handleSubmit = async(e) =>{
        e.preventDefault()
        setLoading(true)

        console.log("The input data is: ", data)
        // console.log("The input data is: ", data)
        try {
           const dataResponse = await fetch(SummaryApi.login.url, {
                method: SummaryApi.login.method,
                // credentials: "include",
                headers: {
                    "content-type" : "application/json",
                },
                body: JSON.stringify(data)
            })
            const dataApi = await dataResponse.json()
            console.log("dataApilogin", dataApi)
            if(dataApi.success){
                console.log("fetched data", dataApi)
                localStorage.setItem("authToken", dataApi.token) 
                localStorage.setItem("userData", JSON.stringify(dataApi.userData));
                toast.success(dataApi.message)
                navigate(from, {replace: true})
                // navigate('/login', { state: { from: location } })
            }
            if(dataApi.error){
                toast.error(dataApi.message)
            } 
        } 
        catch (error) {
            console.log("Error occured in login", error)
        }
        finally{
            setLoading(false)
        }
    }


    return (
        <section className='w-full h-fit flex justify-center items-center py-4 mt-4 '>

            <section className='w-1/2 max-md:w-full flex justify-center'>
                <div className='w-[90%] flex flex-col gap-4'>
                    <p className='text-5xl max-sm:text-3xl font-bold text-center'>Login</p>
                    <span className='w-full text-xl max-sm:text-sm text-slate-700 dark:text-slate-300 -mt-2 mb-6 text-center tracking-[0.5rem]'>to get started</span>

                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                        <input placeholder='Email' type='email' name='email' required className='input-field' value={data.email.toLowerCase()} onChange={handleOnChange} />
                        <label htmlFor="password" className=' flex justify-between items-center relative'>
                            <input id='password' placeholder='password' name='password' required value={data.password} onChange={handleOnChange} type={showPassword ? "text" : "password"} className='input-field outline-none border-0 ' />
                            <i onClick={() => setShowPassword((prev) => !prev)} className='cursor-pointer absolute right-4'> {showPassword ? (<FaEyeSlash />) : (<FaEye />)}
                            </i>
                        </label>
                        <Link to={'/forgot-password'} className='underline text-blue-400 text-right -mt-2 mb-2'>forgot password?</Link>
                        {/* <input placeholder='confirm password' type='password' name='confirmPassword' required value={data.confirmPassword} onChange={handleOnChange} className='input-field' /> */}
                        
                        { loading ? (
                            <span className='btn w-full text-center'>Logging in...</span>
                        ) : (
                            <button className='btn w-full'>Log In</button>
                        )}
                    </form>

                    {/* Divider */}
                    <div className='w-full flex items-center gap-4 my-2'>
                        <div className='flex-1 h-[1px] bg-slate-300 dark:bg-slate-600'></div>
                        <span className='text-slate-500 dark:text-slate-400 text-sm'>or</span>
                        <div className='flex-1 h-[1px] bg-slate-300 dark:bg-slate-600'></div>
                    </div>

                    {/* Google Login */}
                    <GoogleLogin/>

                    <span>Don't have an account? <Link to='/signup' className='active-link'><span className='hover:underline'>Sign Up</span></Link></span>
                </div>

            </section>

            <div className='w-1/2 h-full flex my-auto justify-center items-center max-md:hidden'>
                <Carousel images={images} />
            </div>
        </section>
    )
}

export default Login