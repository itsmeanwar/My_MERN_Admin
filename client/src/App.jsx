import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Services from "./pages/Services";
import Notfound from "./pages/Notfound";
import Footer from "./pages/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop"; 
import Admin from "./pages/Admin/Admin";
import AContacts from "./pages/Admin/AContacts";
import AServices from "./pages/Admin/AServices";
import Users from "./pages/Admin/Users";
import UpdateUser from "./pages/Admin/UpdateUser";

const App = () => {
  return (
    <>
      <Router>
        <ScrollToTop /> {/* <-- THIS ensures every navigation starts at top */}
        
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/service" element={<Services />} />
          <Route path="*" element={<Notfound />} />
          <Route path="/admin" element={<Admin />}>
                <Route path="users" element={<Users/>} />
                    
                 <Route path="users/:id/edit" element={<UpdateUser/>} />
                <Route path="contacts" element={<AContacts />} />
                <Route path="services" element={<AServices />} />
          </Route>
        </Routes>

        <Footer />
      </Router>
    </>
  );
};

export default App;
