import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { Slide, ToastContainer} from 'react-toastify';
import Home from './pages/Home';
import About from './pages/About';
import Upload from './pages/Upload';
import Results from './pages/Results';
import SignUp from './pages/SignUp';
import "react-toastify/dist/ReactToastify.css";
import Login from './pages/Login';
// import Test from './pages/Test';
import MostLikedCaptions from './pages/MostLikedCaptions';
import MyProfile from './pages/MyProfile';
import EditProfile from './components/EditProfile';
import ContactUs from './pages/ContactUs';

// import lightBgImg from './assets/unused/bg-5.svg'
import lightBgImg from './assets/unused/subtle-prism.svg'
import darkBgImg from './assets/unused/subtle-prism.svg'

function App() {

  return (
    <Router>
      <ToastContainer hideProgressBar={true} transition={Slide} />

      <Header/>
      <div className="min-h-screen pt-16 overflow-x-hidden relative flex flex-col scroll-smooth">

        {/* Background image for light mode */}
        {/* <div className="fixed top-0 left-0 w-full h-full -z-10 invert bg-cover bg-center bg-no-repeat bg-fixed dark:hidden" style={{ backgroundImage: `url(${lightBgImg})` }} /> */}
        {/* <div className="fixed top-0 left-0 w-full h-full -z-10 invert bg-cover bg-center bg-no-repeat bg-fixed dark:hidden" style={{ backgroundImage: `url(${darkBgImg})` }} /> */}

        {/* Background image for dark mode */}
        <div className="fixed top-0 left-0 w-full h-full -z-10 blur-[2px] bg-cover bg-center bg-no-repeat bg-fixed hidden dark:block" style={{ backgroundImage: `url(${darkBgImg})` }} />

        <div className="flex-grow bg-transparent">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/results" element={<Results />} />
            <Route path="/most-liked-captions" element={<MostLikedCaptions />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/edit-profile" element={<EditProfile />} />

            {/* <Route path="/testing" element={<Test/>} /> */}
          </Routes>
        </div>
      </div>
      <Footer className="mt-auto" />

    </Router>
  );
}

export default App;
