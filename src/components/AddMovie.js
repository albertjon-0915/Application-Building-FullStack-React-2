import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

export default function AddMovie({ fetchData }) {
     const [title, setTitle] = useState("");
     const [director, setDirector] = useState("");
     const [year, setYear] = useState(0);
     const [description, setDescription] = useState("");
     const [genre, setGenre] = useState("");

     const [modalShow, setModalShow] = useState(false);

     const addMovie = () => {
          setModalShow(false);

          let token = localStorage.getItem("token");

          fetch(`${process.env.REACT_APP_API_URL}/movies/addMovie`, {
               method: "POST",
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
                    if (data.message === "Movie already exist" || data.error) {
                         Swal.fire({
                              title: "Error",
                              icon: "error",
                              text: data.message || data.error,
                         });
                         fetchData();
                    } else {
                         setTitle("");
                         setDirector("");
                         setYear("");
                         setDescription("");
                         setGenre("");

                         Swal.fire({
                              icon: "success",
                              title: "Success",
                              text: "Added new Movie",
                         });
                         fetchData();
                    }
               });
     };

     useEffect(() => {
          fetchData();
     }, [fetchData]);

     return (
          <>
               <div className="p-md-4 p-1 ms-1    ">
                    <Button onClick={() => setModalShow(true)} variant="warning" className="border border-dark my-2">
                         + Add Movie
                    </Button>
               </div>
               <Modal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
               >
                    <Modal.Header closeButton>
                         <Modal.Title id="contained-modal-title-vcenter">Add Workout</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         <Form>
                              <Form.Group controlId="formWorkoutName">
                                   <Form.Label>Movie Title</Form.Label>
                                   <Form.Control
                                        type="text"
                                        placeholder="Enter title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                   />
                              </Form.Group>
                              <Form.Group controlId="formWorkoutDuration">
                                   <Form.Label>Director</Form.Label>
                                   <Form.Control
                                        type="text"
                                        placeholder="Enter director"
                                        value={director}
                                        onChange={(e) => setDirector(e.target.value)}
                                   />
                              </Form.Group>
                              <Form.Group controlId="formWorkoutName">
                                   <Form.Label>Year</Form.Label>
                                   <Form.Control
                                        type="number"
                                        placeholder="Enter year"
                                        value={year}
                                        onChange={(e) => setYear(parseInt(e.target.value))}
                                   />
                              </Form.Group>
                              <Form.Group controlId="formWorkoutDuration">
                                   <Form.Label>Description</Form.Label>
                                   <Form.Control
                                        type="text"
                                        placeholder="Enter description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                   />
                              </Form.Group>
                              <Form.Group controlId="formWorkoutName">
                                   <Form.Label>Genre</Form.Label>
                                   <Form.Control
                                        type="text"
                                        placeholder="Enter genre"
                                        value={genre}
                                        onChange={(e) => setGenre(e.target.value)}
                                   />
                              </Form.Group>
                         </Form>
                    </Modal.Body>
                    <Modal.Footer>
                         <Button onClick={addMovie}>Add</Button>
                         <Button onClick={() => setModalShow(false)}>Close</Button>
                    </Modal.Footer>
               </Modal>
          </>
     );
}
