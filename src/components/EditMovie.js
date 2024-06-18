import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

export default function EditMovie({ fetchData, Id }) {
     const [title, setTitle] = useState("");
     const [director, setDirector] = useState("");
     const [year, setYear] = useState(0);
     const [description, setDescription] = useState("");
     const [genre, setGenre] = useState("");

     const [modalShow, setModalShow] = useState(false);

     let token = localStorage.getItem("token");

     const editMovie = () => {
          setModalShow(false);

          fetch(`${process.env.REACT_APP_API_URL}/movies/updateMovie/${Id}`, {
               method: "PATCH",
               body: JSON.stringify({
                    title,
                    director,
                    year,
                    description,
                    genre,
               }),
               headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);

                    if (data.message === "Movie updated successfully") {
                         Swal.fire({
                              title: "Success",
                              icon: "success",
                              text: data.message || data.error,
                         });
                         fetchData();
                    } else {
                         Swal.fire({
                              title: "Failed to udpate",
                              icon: "error",
                              text: data.message || data.error,
                         });
                         fetchData();
                    }
               });
     };
     const showMovie = () => {
          setModalShow(true);

          fetch(`${process.env.REACT_APP_API_URL}/movies/getMovie/${Id}`, {
               method: "GET",
               headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    if (data.error) {
                         console.log(data.error);
                    }

                    setTitle(data.title);
                    setDirector(data.director);
                    setYear(data.year);
                    setDescription(data.description);
                    setGenre(data.genre);
               });
     };

     useEffect(() => {
          fetchData();
     }, []);

     return (
          genre,
          (
               <>
                    <Button variant="warning" className="border border-dark m-2 mx-md-0 mx-sm-2" onClick={showMovie}>
                         Edit
                    </Button>
                    <Modal
                         show={modalShow}
                         onHide={() => setModalShow(false)}
                         size="lg"
                         aria-labelledby="contained-modal-title-vcenter"
                         centered
                    >
                         <Modal.Header closeButton>
                              <Modal.Title id="contained-modal-title-vcenter">Edit Movie</Modal.Title>
                         </Modal.Header>
                         <Modal.Body>
                              <Form>
                                   <Form.Group controlId="formWorkoutName">
                                        <Form.Label>Movie Title</Form.Label>
                                        <Form.Control
                                             type="text"
                                             placeholder={title}
                                             value={title}
                                             onChange={(e) => setTitle(e.target.value)}
                                        />
                                   </Form.Group>
                                   <Form.Group controlId="formWorkoutDuration">
                                        <Form.Label>Director</Form.Label>
                                        <Form.Control
                                             type="text"
                                             placeholder={director}
                                             value={director}
                                             onChange={(e) => setDirector(e.target.value)}
                                        />
                                   </Form.Group>
                                   <Form.Group controlId="formWorkoutName">
                                        <Form.Label>Year</Form.Label>
                                        <Form.Control
                                             type="number"
                                             placeholder={year}
                                             value={year}
                                             onChange={(e) => setYear(parseInt(e.target.value))}
                                        />
                                   </Form.Group>
                                   <Form.Group controlId="formWorkoutDuration">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                             type="text"
                                             placeholder={description}
                                             value={description}
                                             onChange={(e) => setDescription(e.target.value)}
                                        />
                                   </Form.Group>
                                   <Form.Group controlId="formWorkoutName">
                                        <Form.Label>getMovieenre</Form.Label>
                                        <Form.Control
                                             type="text"
                                             placeholder={genre}
                                             value={genre}
                                             onChange={(e) => setGenre(e.target.value)}
                                        />
                                   </Form.Group>
                              </Form>
                         </Modal.Body>
                         <Modal.Footer>
                              <Button onClick={editMovie} variant="warning" className="border border-dark">
                                   Update
                              </Button>
                              <Button
                                   variant="dark"
                                   className="border border-warning text-warning"
                                   onClick={() => setModalShow(false)}
                              >
                                   Close
                              </Button>
                         </Modal.Footer>
                    </Modal>
               </>
          )
     );
}
