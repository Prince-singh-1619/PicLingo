import React, { useEffect, useRef, useState } from 'react'
import userImg from '../assets/user.png'
import imageTobase64 from '../helpers/imageTobase64'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import SummaryApi from '../helpers/SummaryApi'
// import { updateUser } from '../store/authSlice'
import { Link, useNavigate } from 'react-router'
import { IoCloseSharp } from 'react-icons/io5'
import { FaXTwitter } from 'react-icons/fa6'
import { GrInstagram } from 'react-icons/gr'
import { MdFacebook } from 'react-icons/md'

// const EditProfile = ( {open, onClose, user} ) => {
const EditProfile = ( {open, onClose} ) => {
  const [loading, setLoading] = useState(false)

  // console.log("user-data", user)
  const navigate = useNavigate()
  
  const user = JSON.parse(localStorage.getItem("userData"))
  const token = localStorage.getItem("authToken")
  const [editData, setEditData] = useState({
    userId: user?._id,
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    profilePic: user?.profilePic || "",
    email: user?.email || "",
    facebookUrl: user?.socialLinks?.facebookUrl || "",
    instagramUrl: user?.socialLinks?.instagramUrl || "",
    twitterUrl: user?.socialLinks?.twitterUrl || "",
  })
  const [errors, setErrors] = useState({})
  // const dispatch = useDispatch()

  const handleUploadPic = async (e) => {
    const file = e.target.files[0]
    const imagePic = await imageTobase64(file)

    setEditData((prev) => {
        return {
            ...prev,
            profilePic: imagePic
        }
    })
  }
  const removeProfilePic = (e)=>{
      e.preventDefault()
      setEditData((prev) =>{
          return{
              ...prev, 
              profilePic: ""
          }
      })
  }

  // Social media URL validation functions
  const validateFacebookUrl = (url) => {
    if (!url) return true; // Empty is valid
    const facebookRegex = /^https:\/\/(www\.)?facebook\.com\/[A-Za-z0-9.]+\/?$/;
    return facebookRegex.test(url);
  };
  const validateInstagramUrl = (url) => {
    if (!url) return true; // Empty is valid
    const instagramRegex = /^https:\/\/(www\.)?instagram\.com\/[A-Za-z0-9_.]+\/?$/;
    return instagramRegex.test(url);
  };
  const validateTwitterUrl = (url) => {
    if (!url) return true; // Empty is valid
    const twitterRegex = /^https:\/\/(www\.)?twitter\.com\/[A-Za-z0-9_]{1,15}\/?$/;
    return twitterRegex.test(url);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setEditData((prev) => {
        return {
          ...prev,
          [name]: value
        }
    })
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }
  console.log("input data", editData)

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setLoading(true)
    
    // Validate social media URLs
    const newErrors = {};
    
    if (editData.facebookUrl && !validateFacebookUrl(editData.facebookUrl)) {
      newErrors.facebookUrl = "Please enter a valid Facebook URL (e.g., https://facebook.com/username)";
    }
    if (editData.instagramUrl && !validateInstagramUrl(editData.instagramUrl)) {
      newErrors.instagramUrl = "Please enter a valid Instagram URL (e.g., https://instagram.com/username)";
    }
    if (editData.twitterUrl && !validateTwitterUrl(editData.twitterUrl)) {
      newErrors.twitterUrl = "Please enter a valid Twitter URL (e.g., https://twitter.com/username)";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    // Check if any changes were made
    const originalUser = {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      profilePic: user?.profilePic || "",
      facebookUrl: user?.socialLinks?.facebookUrl || "",
      instagramUrl: user?.socialLinks?.instagramUrl || "",
      twitterUrl: user?.socialLinks?.twitterUrl || "",
    };

    const isChanged = Object.keys(editData).some(
      (key) => editData[key] !== originalUser[key]
    );
    
    if (!isChanged) {
      toast.warning("No changes made");
      setLoading(false);
      return;
    }

    // Prepare data in the format expected by backend
    const updatedFields = {
      userId: user._id,
      firstName: editData.firstName,
      lastName: editData.lastName,
      profilePic: editData.profilePic,
      socialLinks: {
        facebookUrl: editData.facebookUrl || undefined,
        instagramUrl: editData.instagramUrl || undefined,
        twitterUrl: editData.twitterUrl || undefined,
      }
    };

    try {
      const response = await fetch(SummaryApi.updateProfile.url, {
        method: SummaryApi.updateProfile.method,
        headers: {
          'Content-Type': 'application/json',
          "Authorization" : `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFields),
      })  

      const dataApi = await response.json()
      if(dataApi.success){
        // Update local storage with new user data
        const updatedUser = { 
          ...user, 
          ...dataApi.data,
          socialLinks: dataApi.data?.socialLinks || {}
        };
        localStorage.setItem("userData", JSON.stringify(updatedUser));
        
        navigate('/my-profile')
        onClose()
        toast.success(dataApi.message)
      }
      if(dataApi.error){
        toast.error(dataApi.message)
      }
    } 
    catch (error) {
      console.log("error occured in EditProfile", error)
      toast.error("Error updating profile")
    }
    setLoading(false)
  }

  const dialogRef = useRef(null)
  useEffect(()=>{
    const handleClickOutside = (e) =>{
        if(dialogRef.current && !dialogRef.current.contains(e.target)){
            onClose()
        }
    }
    if(open){
        document.addEventListener('mousedown', handleClickOutside)
    }
    return () =>{
        document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, onClose])

  if(!open) return null

  return (
  <div className="fixed inset-0 z-50 backdrop-blur-xs flex justify-center items-center p-4">
    <section ref={dialogRef} className="relative z-60 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#E2E8F0] dark:bg-[#1a1a1a] rounded-xl shadow-lg p-6">
     
      <div className="flex justify-between items-center mb-4">
        <p className="text-4xl max-sm:text-2xl font-bold">Update Profile</p>
        <button onClick={onClose} className="btn w-8 h-8 flex justify-center items-center rounded text-lg" >
          <span className='text-gray-900 dark:text-white/87'> <IoCloseSharp  /> </span>
        </button>
      </div>
      <div className="w-full h-[1px] bg-slate-600 mb-4"></div>

      <section className="flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div className="flex max-[650px]:flex-col flex-wrap justify-between gap-6">
            {/* profile image upload */}
            <div className="h-56 w-56 rounded-full border border-slate-400 dark:border-[#413c3c] overflow-hidden relative mx-auto">
              <img src={editData?.profilePic || userImg} alt="user profile" className="h-full w-full object-cover rounded-full" />
              <input id="upload-pic" type="file" name="profilePic" accept="image/*" className="hidden" onChange={handleUploadPic} />
              <label htmlFor='upload-pic' className='absolute w-full bg-opacity-80 text-center bottom-0 cursor-pointer'>
                <span className='w-full bg-slate-300 dark:bg-[#322f2f] text-black dark:text-[#dadada] bg-opacity-100 z-10 p-1 rounded'>
                    { editData.profilePic==="" ? ("Upload") : (
                        <span onClick={removeProfilePic} className='text-red-600 dark:text-red-400'>remove</span>
                        )
                    }
                </span>
              </label>
            </div>

            {/* profile input fields */}
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex gap-4">
                <input type="text" placeholder="First name" name="firstName" className="w-full input-field" value={editData.firstName} onChange={handleOnChange} />
                <input type="text" placeholder="Last name" name="lastName" className="w-full input-field" value={editData.lastName} onChange={handleOnChange} />
              </div>
              <span className="input-field h-12 cursor-not-allowed">{editData?.email}</span>
              
              {/* social links */}
              <div className="flex items-center gap-2">
                <i className="stat-btn text-lg"> <MdFacebook /> </i>
                <input 
                  type='text' 
                  placeholder="Facebook URL (optional)" 
                  name="facebookUrl" 
                  className={`w-full input-field ${errors.facebookUrl ? 'border-red-500' : ''}`} 
                  value={editData.facebookUrl} 
                  onChange={handleOnChange}
                />
              </div>
              {errors.facebookUrl && <p className="text-red-500 text-sm -mt-2">{errors.facebookUrl}</p>}
              
              <div className="flex items-center gap-2">
                <i className="stat-btn text-lg"> <GrInstagram /> </i>
                <input 
                  type='text' 
                  placeholder="Instagram URL (optional)" 
                  name="instagramUrl" 
                  className={`w-full input-field ${errors.instagramUrl ? 'border-red-500' : ''}`} 
                  value={editData.instagramUrl} 
                  onChange={handleOnChange}
                />
              </div>
              {errors.instagramUrl && <p className="text-red-500 text-sm -mt-2">{errors.instagramUrl}</p>}
              
              <div className="flex items-center gap-2">
                <i className="stat-btn text-lg"> <FaXTwitter /> </i>
                <input 
                  type='text' 
                  placeholder="Twitter URL (optional)" 
                  name="twitterUrl" 
                  className={`w-full input-field ${errors.twitterUrl ? 'border-red-500' : ''}`} 
                  value={editData.twitterUrl} 
                  onChange={handleOnChange}
                />
              </div>
              {errors.twitterUrl && <p className="text-red-500 text-sm -mt-2">{errors.twitterUrl}</p>}
            </div>
          </div>

          <button className="btn mt-4"> {loading ? "Updating..." : "Update"} </button>
        </form>
      </section>
    </section>

    {
      loading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs ">
          <div className="loader"></div> 
        </div>
      ) : null
    }
  </div>

  )
}

export default EditProfile