const express = require('express')
const router = express.Router()

const signUpController = require('../controller/user/signUp')
const loginController = require('../controller/user/login')
const authToken = require('../middlewares/authToken')
const userDetailsController = require('../controller/user/userDetails')
const userLogoutController = require('../controller/user/userLogout')
const saveCaptionController = require('../controller/caption/saveCaption')
const mostLikedCaptions = require('../controller/caption/mostLikedCaptions')


router.post('/signup', signUpController)
router.post('/login', loginController)
router.get('/user-details', userDetailsController)
// router.get('/user-details', authToken, userDetailsController)
router.get("/user-logout", userLogoutController)


// caption routes
router.post('/save-caption', authToken, saveCaptionController)
router.get('/get-liked-captions', authToken, mostLikedCaptions)




module.exports = router