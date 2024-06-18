import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import UserContext from "../UserContext";
import Swal from "sweetalert2";

export default function ViewMovie({ Id }) {
     const { user } = useContext(UserContext);
     const [movie, setMovie] = useState({});
     let token = localStorage.getItem("token");

     const getMovieById = () => {
          fetch(`${process.env.REACT_APP_API_URL}/movies/getMovie/${Id}`, {
               headers: {
                    "Content-type": "application/json",
                    authorization: `Bearer ${token}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);
                    if (data.message === "Failed to get movie" || data.error) {
                         Swal.fire({
                              icon: "error",
                              title: "Please try again later",
                              text: data.message || data.error,
                         });
                    } else {
                         setMovie(data);
                         console.log(movie);
                    }
               });
     };

     return movie._id === undefined ? (
          <Button className="bg-dark border border-warning text-warning" onClick={getMovieById}>
               View
          </Button>
     ) : user.id ? (
          <Navigate to={"/viewMovie"} state={{ movie }} />
     ) : (
          <Navigate to={"/login"} />
     );
}
