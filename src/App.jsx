import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Upload from './pages/Upload'
import Results from './pages/Results'

function App() {

  return (
    <Router>
        <Header/>
        
        <div className='pt-16 overflow-x-hidden'>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/upload' element={<Upload/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/results' element={<Results/>} />
          </Routes>
        </div>
        
        <Footer/> 
    </Router>
  )
}

export default App
