import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Blogs from './pages/Blogs'
import About from './pages/About'
import ForgotPassword from './pages/Forgotpassword'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import CreateListing from './pages/CreateListing'
import Listing from './pages/Listing'
import Category from './pages/Category'
import EditListing from './pages/EditListing'



function App() {
  return (
    <>
    <Router>
      <Header/>
      
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Sign-in' element={<Signin/>} />
        <Route path='/Sign-up' element={<Signup/>} />
        <Route path='/Blogs' element={<Blogs/>}/>
        <Route path='/About' element={<About/>} />
        <Route path="/about" element={<About/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path='/category/:categoryName/:listingId' element={<Listing/>}/>
        <Route path='/category/:categoryName' element={<Category />} />


        <Route path='/Create-listing' element={<PrivateRoute/>}>
            <Route path='/Create-listing' element={<CreateListing/>} />
        </Route>

        <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path='/edit-listing' element={<PrivateRoute/>}>
            <Route path='/edit-listing/:listingId' element={<EditListing/>} />
        </Route>
        

      </Routes>
    </Router>

    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    />
   
   </>
  )
}

export default App
