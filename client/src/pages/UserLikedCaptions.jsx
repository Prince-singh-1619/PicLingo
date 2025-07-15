import React, { useEffect, useState } from 'react'
import { BiLike, BiSolidLike } from 'react-icons/bi'
import { RiTranslateAi2 } from "react-icons/ri";
import { GrNext, GrPrevious, GrRevert } from "react-icons/gr";
import { FaCheck } from 'react-icons/fa'
import { LuCopy } from 'react-icons/lu'
import SummaryApi from '../helpers/SummaryApi'
import { toast } from 'react-toastify'
import isLoggedIn from '../helpers/isLoggedIn'
import TypewriterText from '../animations/TypewriterText'
import {motion} from 'motion/react'
import AnimateNumber from '../animations/AnimateNumber';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import Select from 'react-select';
import useTheme from '../hooks/useTheme';
import { MdDelete } from 'react-icons/md';


const UserLikedCaptions = () => {
    const [loading, setLoading] = useState(false)
    const [capArray, setCapArray] = useState([])
    const [copiedIndex, setCopiedIndex] = useState(null)
    const [likedCaptions, setLikedCaptions] = useState(new Set())
    const [capSaved, setCapSaved] = useState(new Set())
    const [translatedTexts, setTranslatedTexts] = useState([])
    const [translatedIndex, setTranslatedIndex] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTags, setSelectedTags] = useState([]);
    const itemsPerPage = 10;
    const theme = useTheme();
    const isDarkMode = () => theme === 'dark';

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    //receiving captions from my-profile page
    useEffect(() => {
        const captions = location.state?.captions || [];
        setCapArray(captions);
    }, [location.state?.captions]);

    // Extract all unique tags from capArray
    const allTags = Array.from(new Set(capArray.flatMap(item => item.tags)));
    const tagOptions = allTags.map(tag => ({ value: tag, label: tag }));

    // Filter and sort captions
    const filteredAndSortedCaptions = capArray
        .filter(item =>
            selectedTags.length === 0 || selectedTags.every(tag => item.tags.includes(tag))
        )
        .sort((a, b) => b.likeCount - a.likeCount);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAndSortedCaptions.slice(indexOfFirstItem, indexOfLastItem);
    
    //user
    const authToken = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("userData"));
    const userId = user?._id;

    // Initialize page from URL parameter
    useEffect(() => {
        const pageFromUrl = parseInt(searchParams.get('page')) || 1;
        setCurrentPage(pageFromUrl);
    }, [searchParams]);

    // Update URL when page changes
    const updatePageInUrl = (newPage) => {
        setSearchParams({ page: newPage.toString() });
    };

    // Validate page number after data is loaded
    useEffect(() => {
        if (capArray.length > 0) {
            const maxPage = Math.ceil(capArray.length / itemsPerPage);
            const currentPageFromUrl = parseInt(searchParams.get('page')) || 1;
            
            if (currentPageFromUrl > maxPage) {
                // If the page from URL is beyond available pages, go to the last page
                const newPage = maxPage;
                setCurrentPage(newPage);
                updatePageInUrl(newPage);
            } else if (currentPageFromUrl < 1) {
                // If the page from URL is less than 1, go to page 1
                setCurrentPage(1);
                updatePageInUrl(1);
            }
        }
    }, [capArray.length, searchParams]);

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

    // const handleLike = async(event, captionId) =>{
    //     if(!isLoggedIn()){
    //         toast.warning("Please login")
    //         return 
    //     }

    //     try{
    //         setLikedCaptions((prev)=>{
    //             const newSet = new Set(prev);
    //             if (newSet.has(captionId)) {
    //                 newSet.delete(captionId);
    //             } else {
    //                 newSet.add(captionId);
    //             }
    //             return newSet;
    //         });

    //         if (!capSaved.has(captionId)) {
    //             const success = await saveCaption(event, captionId);
    //             if(success){
    //                 setCapArray(prev => prev.map(
    //                     (item)=> item._id === captionId ? {...item, likeCount:item.likeCount+1} : item)
    //                 )
    //                 setCapSaved(prev => new Set([...prev, captionId]));
                    
    //                 // Increment totalLikes in user statistics
    //                 try {
    //                     const response = await fetch(SummaryApi.incrementTotalLikes.url, {
    //                         method: SummaryApi.incrementTotalLikes.method,
    //                         headers: {
    //                             'Authorization': `Bearer ${authToken}`,
    //                             'Content-Type': 'application/json'
    //                         },
    //                         credentials: 'include',
    //                         body: JSON.stringify({ userId: userId })
    //                     });
    //                     const responseData = await response.json();
    //                     if (responseData.success) {
    //                         console.log('Total likes incremented successfully');
    //                     } else {
    //                         console.log('Failed to increment total likes:', responseData.message);
    //                     }
    //                 } catch (error) {
    //                     console.error('Error incrementing total likes:', error);
    //                 }
    //             }
    //         }
    //     }
    //     catch(error){
    //         console.error("Error occurred in liking caption ", error)
    //     }
    // }

    // const saveCaption = async(event, captionId) =>{
    //     event.preventDefault();
    //     if(!isLoggedIn()){
    //         toast.warning("Please login")
    //         return 
    //     }

    //     try{
    //         const caption = capArray.find(item => item._id === captionId);
    //         if (!caption) {
    //             console.error("Caption not found");
    //             return false;
    //         }

    //         const data = {caption: caption.caption, userId: userId}

    //         const dataResponse = await fetch(SummaryApi.saveCaptions.url, {
    //             method : SummaryApi.saveCaptions.method,
    //             credentials: "include",
    //             headers: {
    //             'Authorization': `Bearer ${authToken}`,
    //             "content-type" : "application/json"
    //             },
    //             body: JSON.stringify(data),
    //         })
    //         const dataApi = await dataResponse.json()
    //         console.log("dataApi at saveCaption", dataApi)
            
    //         if(dataApi.success){
    //             console.log(dataApi.message)
    //             return true
    //         }
    //         if(dataApi.error){
    //             console.log("Error while saving caption", dataApi.message)
    //             return false
    //         }
    //         return false
    //     } 
    //     catch(error){
    //     console.error("Error occurred in storing caption ", error)
    //     return false
    //     }
    // }

    const translateText = async(text) =>{
        // console.log("called")
        try {
            const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|hi`);
            //for other language translation, change langCode in API
            const data = await res.json();
            return data.responseData.translatedText;
        } 
        catch (err) {
            console.error('Translation error', err)
            return text  
        }
    }

    const handleTranslate = async(event, index, originalText) =>{
        if(translatedIndex.includes(index)){
            //Toggle back to original
            setTranslatedIndex((prev)=> prev.filter((i)=>i!==index) )
        }
        else{
            try {
                const translated = await translateText(originalText) // hi -> hindi
                setTranslatedTexts((prev) =>({ ...prev, [index] : translated }))
                setTranslatedIndex(prev => [...prev, index])
            } 
            catch (err) {
                console.error("Translation failed", err)  
            }
        }
    }

    const handleRemove = async(captionId) => {
        console.log("captionId:", captionId)
        try {
            const response = await fetch(`${SummaryApi.removeUserCaption.url}?userId=${userId}&captionId=${captionId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}` // Include this if your route is protected
                },
                // credentials: 'include',
            });

            const result = await response.json();

            if (result.success) {
                console.log('Caption removed successfully');
                // Remove caption from local state immediately
                setCapArray(prevArray => prevArray.filter(item => item._id !== captionId));
                toast.success('Caption removed successfully');
            } else {
                console.error('Failed to remove caption:', result.message);
                toast.error('Failed to remove caption');
            }
        } 
        catch (err) {
            console.error('Error removing caption:', err.message || err);
            toast.error('Error removing caption');
        }
    };

    // Handle page navigation with URL update
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        updatePageInUrl(newPage);
    };

    // Tag filter handler for react-select
    const handleTagChange = (selected) => {
        setCurrentPage(1); // Reset to first page on filter change
        setSelectedTags(selected ? selected.map(option => option.value) : []);
    };


  return (
    <section className='flex flex-col justify-center my-8'>
        <div className='flex flex-col justify-center items-center py-6'>
            <div className='text-5xl max-sm:text-3xl font-bold text-center'><TypewriterText text="You Most Loved Captions"/></div>
            <p className='text-xl text-slate-700 dark:text-slate-300 text-[clamp(1rem,2vw,1.25rem)] w-[80%] sm:w-[60%] md:w-[55%] text-center p-4'>Discover the captions that captured the most hearts! These community favorites have resonated the most—whether it’s humor, inspiration, or creativity, they’ve left a mark.</p>
        </div>

        {/* Tag Filter UI - react-select */} 
        <div className='flex flex-wrap gap-2 justify-center mb-6'>
            <div style={{ minWidth: 250, width: '40vw', maxWidth: 500 }}>
                <Select
                    isMulti
                    className='bg-white dark:bg-[#121212]'
                    name="tags"
                    options={tagOptions}
                    classNamePrefix="select"
                    placeholder="Filter by tags..."
                    value={tagOptions.filter(option => selectedTags.includes(option.value))}
                    onChange={handleTagChange}
                    styles={{
                        menu: (provided) => ({
                            ...provided,
                            zIndex: 9999,
                            backgroundColor: isDarkMode() ? '#18181b' : '#fff',
                            color: isDarkMode() ? '#f3f4f6' : '#1e293b',
                        }),
                        control: (provided, state) => ({
                            ...provided,
                            backgroundColor: isDarkMode() ? '#18181b' : '#fff',
                            borderColor: state.isFocused
                                ? (isDarkMode() ? '#903fcf' : '#903fcf')
                                : (isDarkMode() ? '#334155' : '#cbd5e1'),
                            boxShadow: state.isFocused ? '0 0 0 1px #903fcf' : provided.boxShadow,
                            color: isDarkMode() ? '#f3f4f6' : '#1e293b',
                        }),
                        singleValue: (provided) => ({
                            ...provided,
                            color: isDarkMode() ? '#f3f4f6' : '#1e293b',
                        }),
                        multiValue: (provided) => ({
                            ...provided,
                            backgroundColor: isDarkMode() ? '#27272a' : '#e0e7ef',
                            color: isDarkMode() ? '#f3f4f6' : '#1e293b',
                        }),
                        multiValueLabel: (provided) => ({
                            ...provided,
                            color: isDarkMode() ? '#f3f4f6' : '#1e293b',
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isSelected
                                ? (isDarkMode() ? '#903fcf' : '#903fcf')
                                : state.isFocused
                                ? (isDarkMode() ? '#27272a' : '#f3f4f6')
                                : (isDarkMode() ? '#18181b' : '#fff'),
                            color: isDarkMode() ? '#f3f4f6' : '#1e293b',
                            cursor: 'pointer',
                        }),
                        input: (provided) => ({
                            ...provided,
                            color: isDarkMode() ? '#f3f4f6' : '#1e293b',
                        }),
                        placeholder: (provided) => ({
                            ...provided,
                            color: isDarkMode() ? '#a1a1aa' : '#64748b',
                        }),
                    }}
                />
            </div>
        </div>

        <div className='h-fit w-[57%] max-lg:w-[75%] max-sm:w-[90vw] border border-slate-600 rounded-lg p-4 mx-auto'>
            {/* <span className='pt-4 text-2xl font-bold text-gradient'><TypewriterText text="Most Liked Captions"/> </span> */}
            <div className='flex flex-col gap-4'>
                {
                filteredAndSortedCaptions.length ? (
                    currentItems.map((data, index)=>{
                    return(
                        <motion.div key={index} initial={{y:-index*(175)}} 
                        animate={{y:index*0}} 
                        transition={{duration:1, delay:index*1/3,}}
                        style={{zIndex: data.length-index}}
                        className=' border border-slate-600 rounded-lg p-4 flex flex-col gap-4 bg-[#E2E8F0] dark:bg-[#1a1a1a]'>
                        <p className='text-lg text-slate-700 dark:text-slate-300' value={data.caption}>{translatedIndex.includes(index) ? translatedTexts[index]: data.caption}</p>
                        <div className='flex max-md:flex-col items-center text-sm'>
                            <div className='opacity-75 max-md:w-full max-md:ml-4'><span>KeyWords/Category:</span></div>
                            <div className='p-1 flex gap-2 w-contain w-full flex-wrap'>
                            {
                                data.tags.map((data, index)=>{
                                return(
                                  <span key={index} className='h-5 w-fit p-1 border border-slate-600 rounded flex justify-center items-center'>{data}</span>
                                )
                                })
                            }
                            </div>
                        </div>
                        <div className='flex justify-between max-sm:flex-row-reverse'>
                            <div className='flex gap-6 max-sm:hidden'>
                                <i className='h-10 w-fit p-2 border border-slate-700 hover:text-white flex justify-center items-center text-lg rounded-lg hover:dark:bg-gray-700 cursor-no-drop transition-all'>
                                    <BiSolidLike/>
                                    <AnimateNumber value={data.likeCount} length={index}/>
                                </i>
                                <i className='h-10 w-10 border border-slate-700 hover:text-white flex justify-center items-center text-lg rounded-lg hover:dark:bg-gray-700 cursor-pointer transition-all' onClick={(e)=>handleTranslate(e,index, data.caption)} title='translate'> 
                                    {
                                    translatedIndex.includes(index) ? (<GrRevert/>) : (<RiTranslateAi2/>)
                                    } 
                                </i>
                                <i className='h-10 w-10 border border-slate-700 hover:text-white flex justify-center items-center text-lg rounded-lg hover:dark:bg-gray-700 cursor-pointer transition-all' onClick={(e)=>handleRemove(data._id)} title='delete'> 
                                    <MdDelete/>
                                </i>
                            </div>
                            <div className='flex gap-2 items-center btn btn-copy hover:bg-white '>
                            {/* <div className='flex gap-2 items-center border border-slate-700 px-4 rounded-lg hover:bg-gray-700 cursor-pointer transition-all max-sm:h-12'> */}
                            <i id='copy-icon'>{copiedIndex===index ? (<FaCheck/>) : (<LuCopy/>)}</i>
                            <p id='copy-text' className='text-slate-700 dark:text-slate-300 ' onClick={()=>copyText(data.caption, index)}>{copiedIndex===index ? ('Copied') : ('Copy')}</p>
                            </div>
                        </div>
                        </motion.div> 
                    )
                    })
                ) : (
                    <div>No Captions found</div>
                ) 
                }
            </div>
        </div>


        {/* paging */}
        <div className="flex justify-center items-center gap-6 mt-10">
        {/* Prev Button */}
        <button
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-xl font-bold rounded-full transition-all duration-300
            ${
                currentPage === 1
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-[linear-gradient(108deg,_#903fcf_0%,_#cf0f3c_100%)] text-white hover:brightness-110 hover:shadow-lg cursor-pointer'
            }`}
        >
            <GrPrevious />
        </button>

        {/* Page Info */}
        <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Page <span className="text-blue-500">{currentPage}</span> of{' '}
            {Math.ceil(filteredAndSortedCaptions.length / itemsPerPage)}
        </span>

        {/* Next Button */}
        <button
            onClick={() =>
            handlePageChange(Math.min(currentPage + 1, Math.ceil(filteredAndSortedCaptions.length / itemsPerPage)))
            }
            disabled={currentPage === Math.ceil(filteredAndSortedCaptions.length / itemsPerPage) || filteredAndSortedCaptions.length === 0}
            className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300
            ${
                currentPage === Math.ceil(filteredAndSortedCaptions.length / itemsPerPage) || filteredAndSortedCaptions.length === 0
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-[linear-gradient(288deg,_#903fcf_0%,_#cf0f3c_100%)] text-white hover:brightness-110 hover:shadow-lg cursor-pointer'
            }`}
        >
            <GrNext/>
        </button>
        </div>


        {
            loading ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs ">
                    <div className="loader"></div> 
                </div>
            ) : null
        }
    </section>
  )
}

export default UserLikedCaptions