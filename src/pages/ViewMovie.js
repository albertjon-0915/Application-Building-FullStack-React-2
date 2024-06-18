import { useEffect, useState } from "react";
import { Container, Table, Form, Col, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

export default function ViewMovie() {
     const { state } = useLocation();
     const movie = state?.movie || {};
     console.log(movie);
     const [viewComment, setViewComment] = useState([]);
     const [newComment, setNewComment] = useState("");
     console.log(movie._id);

     const fetchComment = () => {
          let token = localStorage.getItem("token");
          fetch(`${process.env.REACT_APP_API_URL}/movies/getComments/${movie._id}`, {
               headers: {
                    "Content-type": "application/json",
                    authorization: `Bearer ${token}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);
                    setViewComment(data);
               });
     };

     const addComment = (e) => {
          e.preventDefault();
          let token = localStorage.getItem("token");
          fetch(`${process.env.REACT_APP_API_URL}/movies/addComment/${movie._id}`, {
               method: "PATCH",
               body: JSON.stringify({
                    comment: newComment,
               }),
               headers: {
                    "Content-type": "application/json",
                    authorization: `Bearer ${token}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);
                    if (data.message === "Comment Added Successfully") {
                         Swal.fire({
                              icon: "success",
                              title: "Added comment",
                              text: data.message,
                         });
                    }
               });
     };

     useEffect(() => {
          fetchComment();
     }, [movie, viewComment]);

     return (
          <Container>
               <img
                    src="https://thereelbits.com/wp-content/uploads/2011/12/paramount-logo100.jpg"
                    alt="logo"
                    className="viewMovieImg"
               />
               <h1 className="my-5">{movie.title}</h1>
               <p className="zeroMargin">{movie.description}</p>
               <p className="zeroMargin">Director: {movie.director}</p>
               <p className="zeroMargin">Year: {movie.year}</p>
               <p className="zeroMargin">Genre: {movie.genre}</p>
               <h4 className="fs-5 mt-5">Comments:</h4>
               <Form onSubmit={(e) => addComment(e)}>
                    <Form.Group as={Col} md="4" controlId="commentForm">
                         <Form.Control
                              required
                              type="comment"
                              placeholder="Comment"
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                         />
                         <Button type="submit" className="bg-dark border border-warning text-warning mb-5 mt-3">
                              Add comment
                         </Button>
                    </Form.Group>
               </Form>
               {viewComment.length > 0 ? (
                    <Table striped hover size="sm">
                         <tbody>
                              {viewComment.map((item) => (
                                   <tr key={item._id}>
                                        <td id="commentContainer">
                                             <div className="text-warning">
                                                  <h6 className="zeroMargin">{item.userId}</h6>
                                             </div>
                                             <div>{item.comment}</div>
                                        </td>
                                   </tr>
                              ))}
                         </tbody>
                    </Table>
               ) : (
                    <p>No comments available</p>
               )}
          </Container>
     );
}
