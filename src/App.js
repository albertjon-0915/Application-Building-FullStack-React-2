import "./App.css";
import { useState, useEffect } from "react";
import { UserProvider } from "./UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppNavBar from "./components/AppNavBar";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./components/Logout";
import Movies from "./pages/Movies";
import ViewMovie from "./pages/ViewMovie";
import AdminViewMovies from "./pages/AdminViewMovies";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";

export default function App() {
     const [user, setUser] = useState("");

     const unsetUser = () => {
          localStorage.clear();
     };

     useEffect(() => {
          fetch(`${process.env.REACT_APP_API_URL}/users`, {
               method: "GET",
               headers: {
                    "Content-type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    if (typeof data !== undefined) {
                         console.log(data);
                         setUser(data);
                    } else {
                         setUser({
                              id: null,
                              isAdmin: null,
                         });
                    }
               });
     }, []);

     return (
          <>
               <UserProvider value={{ user, setUser, unsetUser }}>
                    <div className="">
                         <Router>
                              <AppNavBar />
                              <Routes>
                                   <Route path="/register" element={<Register />} />
                                   <Route path="/login" element={<Login />} />
                                   <Route path="/logout" element={<Logout />} />
                                   <Route path="/" element={<Home />} />
                                   <Route path="/movies" element={<Movies />} />
                                   <Route path="/viewMovie" element={<ViewMovie />} />
                                   <Route path="/adminView" element={<AdminViewMovies />} />
                                   <Route path="*" element={<ErrorPage />} />
                              </Routes>
                         </Router>
                    </div>
               </UserProvider>
          </>
     );
}
