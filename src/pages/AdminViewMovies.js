import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";

import EditMovie from "../components/EditMovie";
import AddMovie from "../components/AddMovie";

export default function Workout() {
     const [movie, setMovie] = useState([]);

     let token = localStorage.getItem("token");
     console.log(movie);

     const fetchData = () => {
          fetch(`${process.env.REACT_APP_API_URL}/movies/getMovies`, {
               headers: {
                    "Content-type": "application/json",
                    authorization: `Bearer ${token}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    if (data.message === "No items found" || data.error) {
                         setMovie(null);
                    } else {
                         setMovie(data.movies);
                    }
               });
     };

     const deleteMovie = (Id) => {
          fetch(`${process.env.REACT_APP_API_URL}/movies/deleteMovie/${Id}`, {
               method: "DELETE",
               headers: {
                    "Content-type": "application/json",
                    authorization: `Bearer ${token}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    if (data.message === "Movie deleted successfully") {
                         Swal.fire({
                              title: "Successfully deleted",
                              text: data.message,
                         });
                         fetchData();
                    } else {
                         Swal.fire({
                              icon: "error",
                              title: "Cannot deleted",
                              text: data.message || data.error,
                         });
                         fetchData();
                    }
               });
     };

     useEffect(() => {
          fetchData();
     }, []);

     return (
          <>
               <AddMovie fetchData={fetchData} />

               {movie.length > 0 ? (
                    <Table striped bordered hover size="sm">
                         <thead>
                              <tr>
                                   <th>Movies</th>
                              </tr>
                         </thead>
                         <tbody>
                              {movie.map((item) => (
                                   <tr key={item._id}>
                                        <td className="px-5 d-flex flex-md-row flex-column justify-content-between">
                                             <div className="d-flex flex-column">
                                                  <h1 className="my-3">{item.title}</h1>
                                                  <p className="zeroMargin">{item.description}</p>
                                                  <p className="zeroMargin">Director: {item.director}</p>
                                                  <p className="zeroMargin">Year: {item.year}</p>
                                                  <p className="zeroMargin">Genre: {item.genre}</p>
                                             </div>
                                             <div className="d-flex flex-md-column flex-sm-row justify-content-md-center justify-content-md-end">
                                                  <EditMovie fetchData={fetchData} Id={item._id} />

                                                  <Button
                                                       variant="dark"
                                                       className="border border-warning my-2 text-warning"
                                                       onClick={(e) => deleteMovie(item._id)}
                                                  >
                                                       Delete
                                                  </Button>
                                             </div>
                                        </td>
                                   </tr>
                              ))}
                         </tbody>
                    </Table>
               ) : (
                    <h3 className="d-flex justify-content-center my-5 py-5 text-dark">
                         Getting ready your &nbsp;<span className="text-warning">dashboard...</span>
                    </h3>
               )}
          </>
     );
}
