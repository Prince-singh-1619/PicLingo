// const backendDomain = "http://localhost:8080"
    // backend currently deployed on render
// const backendDomain = "https://pic-lingo-server.vercel.app"
const backendDomain = "https://piclingo.onrender.com"

const SummaryApi = {
    signUp:{
        url: `${backendDomain}/api/signup`,
        method: "POST"
    },
    login:{
        url: `${backendDomain}/api/login`,
        method: "POST" 
    },
    contactUs:{
        url: `${backendDomain}/api/contact-us`,
        method: "POST"
    },
    userDetails:{
        url: `${backendDomain}/api/user-details`,
        method: "GET" 
    },
    userLogout:{
        url: `${backendDomain}/api/user-logout`,
        method: "GET" 
    },
    saveCaptions:{
        url: `${backendDomain}/api/save-caption`,
        method: "POST"
    },
    getAllCaptions:{
        url: `${backendDomain}/api/most-liked-captions`,
        method: "GET" 
    },
    updateProfile:{
        url: `${backendDomain}/api/update-proflie`,
        method: "PUT" 
    },
    userLikedCaptions:{
        url: `${backendDomain}/api/user-liked-captions`,
        method: "GET" 
    },
    removeUserCaption:{
        url: `${backendDomain}/api/remove-liked-caption`,
        method: "DELETE" 
    },
    updateUploadCount:{
        url: `${backendDomain}/api/update-upload-count`,
        method: "POST"
    },
    incrementCaptionsGenerated: {
        url: `${backendDomain}/api/increment-captions-generated`,
        method: "POST"
    },
    incrementTotalLikes: {
        url: `${backendDomain}/api/increment-total-likes`,
        method: "POST"
    }
}

export default SummaryApi
