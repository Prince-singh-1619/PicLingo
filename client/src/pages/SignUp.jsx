import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import defaultUser from '../assets/user.png'
import imageTobase64 from '../helpers/imageTobase64'
import SummaryApi from '../helpers/SummaryApi'
import { toast } from 'react-toastify'
import Carousel from '../components/Carousel'
import imgwelcome from "../assets/welcome-1.jpg"
import img1 from '../assets/carousel-item-1.png'
import img2 from '../assets/carousel-item-2.jpg'
import img3 from '../assets/carousel-item-3.png'
import { FcGoogle } from "react-icons/fc";
import GoogleLogin from '../components/GoogleLogin'


const images = [imgwelcome, img2, img3, img1];

const SignUp = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    // const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [data, setData] = useState({
        profilePic: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    // const location = useLocation()
    // const from = location.state?.from?.pathname || '/'

    const handleUploadPic = async (e) => {
        const file = e.target.files[0]
        const imagePic = await imageTobase64(file)

        setData((prev) => {
            return {
                ...prev,
                profilePic: imagePic
            }
        })
    }
    const removeProfilePic = (e)=>{
        e.preventDefault()
        setData((prev) =>{
            return{
                ...prev, 
                profilePic: ""
            }
        })
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target
        if(name==="password"){
            setError(value.length < 8 ? "Minimum 8 characters required" : "");
        }
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        console.log("The input data is: ", data)
        // console.log("the url is: ", SummaryApi.signUp.url, SummaryApi.signUp.method)

        if(data.password.length<8){
            toast.warning("Password length is less than 8")
        }
        else if (data.password === data.confirmPassword) {
            const dataResponse = await fetch(SummaryApi.signUp.url, {
                method: SummaryApi.signUp.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const dataApi = await dataResponse.json()

            if (dataApi.success) {
                console.log("dataApi message from success: ", dataApi.message)
                toast.success(dataApi.message)
                navigate("/login")
            }
            if (dataApi.error) {
                console.log("dataApi message from error: ", dataApi.message)
                toast.error(dataApi.message)
            }
        }
        else {
            toast.warning("Please check password and confirm password")
        }
        setLoading(false)
    }


    return (
        <section id='Signup' className='h-full w-full py-6 flex max-md:justify-center max-md:items-center gap-6 px-6'>
            <div className='w-1/2 h-full flex my-auto justify-center items-center max-md:hidden'>
                <Carousel images={images} />
            </div>

            <section className='w-1/2 max-md:w-full flex justify-center'>
                <div className='w-[90%] flex flex-col gap-4'>
                    <p className='text-5xl max-sm:text-3xl font-bold text-center'>Create an account</p>
                    
                    {/* input profile image */}
                    <div className='h-28 w-28 rounded-full mx-auto flex justify-center items-center object-contain border-[1px] border-slate-400 dark:border-[#413c3c] overflow-hidden relative'>
                        <img src={data.profilePic || defaultUser} alt='user profile' className='h-full w-full object-cover rounded-full'/>
                        <input id='upload-pic' type='file' name='profilePic' accept="image/*" className='hidden' onChange={handleUploadPic}/>
                        <label htmlFor='upload-pic' className='absolute w-full bg-opacity-80 text-center bottom-0 cursor-pointer'>
                            <span className='w-full bg-slate-300 dark:bg-[#322f2f] text-black dark:text-[#dadada] bg-opacity-100 z-10 p-1 rounded'>
                                { data.profilePic==="" ? ("Upload") : (
                                    <span onClick={removeProfilePic} className='text-red-600 dark:text-red-400'>remove</span>
                                    )
                                }
                            </span>
                            
                        </label>
                    </div>

                    {/* input profile data */}
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                        <div className='flex gap-4'>
                            <input placeholder='First name' name='firstName' required className='input-field' value={data.firstName} onChange={handleOnChange}/>
                            <input placeholder='Last name' name='lastName' required className='input-field' value={data.lastName} onChange={handleOnChange} />
                        </div>
                        <input placeholder='Email' type='email' name='email' required className='input-field' value={data.email.toLowerCase()} onChange={handleOnChange} />
                        <label htmlFor="password" className=' flex justify-between items-center relative'>
                            <input id='password' placeholder='password' name='password' required value={data.password} onChange={handleOnChange} type={showPassword ? "text" : "password"} className='input-field outline-none border-0 ' />
                            <i onClick={() => setShowPassword((prev) => !prev)} className='cursor-pointer absolute right-4'> {showPassword ? (<FaEyeSlash />) : (<FaEye />)}
                            </i>
                        </label>
                            {error && <p className='text-red-400 -mt-4 text-sm ml-2'>{error}</p>}
                        <input placeholder='confirm password' type='password' name='confirmPassword' required value={data.confirmPassword} onChange={handleOnChange} className='input-field' />
                        {/* <button className='btn'> {loading ? "Creating" : "Create account"} </button> */}
                        
                        { loading ? (
                            <span className='btn w-full text-center'>Creating...</span>
                        ) : (
                            <button className='btn w-full'>Create account</button>
                        )}
                    </form>

                    {/* Divider */}
                    <div className='w-full flex items-center gap-4 my-2'>
                        <div className='flex-1 h-[1px] bg-slate-300 dark:bg-slate-600'></div>
                        <span className='opacity-75 text-sm'>or</span>
                        <div className='flex-1 h-[1px] bg-slate-300 dark:bg-slate-600'></div>
                    </div>

                    {/* Google Login */}
                    <GoogleLogin/>
                    

                    <span>Already have an account? <Link to='/login' className='active-link'><span className='hover:underline'>Log in</span></Link></span>
                </div>

            </section>


        </section>
    )
}

export default SignUp