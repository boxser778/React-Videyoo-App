import HomePage from "./layout/main/Home";
import About from "./layout/main/About/About.jsx";
import { Routes, Route } from "react-router-dom";
import Error404 from "./layout/main/Error404";
import Header from "./layout/header/Header.jsx";
import Footer from "./layout/footer/footer.jsx";
import Logout from "./layout/main/Logout";
import Login from "./layout/main/Login";
import Signup from "./layout/main/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentUser } from "./services/userService";
import AdminPage from "../src/layout/main/_Admin/AdminPage";
import LoginControllerPage from "../src/layout/main/LoginControllerPage";
import { useEffect } from "react";
import { gapi } from "gapi-script"
import UploadVideoPage from "./layout/main/UploadVideoPage/UploadVideoPage";
import EditUser from "./layout/main/EditUser/EditUser";
import VideoDetailPage from "./layout/main/VideoDetailPage/VideoDetailPage";
import MyVideos from "./layout/main/MyVideosPage/MyVideos";
import ContactPage from "./layout/main/ContactUs/Contact";
import EditVideo from "./layout/main/EditVideo/EditVideo";

function App() {
  const user = getCurrentUser();
 
  // @ add your client google id here
  // to active google login option
    const clientId = "";

 useEffect(()=>{
   function start() {
     gapi.client.init({
       clientId:clientId,
       scope:"profile"
     })
   }
   gapi.load("client:auth2",start);
 })
  return (
    <div className="App">
      <Header user={user} />
      <ToastContainer />

      <main style={{ minHeight: "85vh" }}>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/admin-controll" element={<AdminPage />} />       
          <Route path="/login-form" element={<LoginControllerPage />} />
          <Route  path="/video/upload" element={<UploadVideoPage/>} />    
          <Route  path="/my-videos" element={<MyVideos/>} />
          <Route  path="/video/:videoId" element={<VideoDetailPage/>} />
          <Route  path="/contact-page" element={<ContactPage/>} />
          <Route  path="/edit-video/:videoId" element={<EditVideo/>} />
          <Route  path="/edit-user/:userId" element={<EditUser/>} />
        </Routes>
      </main>
      <Footer />
        
    </div>  
 
  );
}

export default App;
