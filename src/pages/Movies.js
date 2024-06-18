import { useEffect, useState } from "react";
import { Card, Button, Col, Row, Container } from "react-bootstrap";
import BtnViewMovie from "../components/BtnViewMovie";

export default function GetMovies() {
     const [movies, setMovies] = useState([]);

     useEffect(() => {
          fetch(`${process.env.REACT_APP_API_URL}/movies/getMovies`)
               .then((res) => res.json())
               .then((data) => {
                    if (data && data.movies) {
                         setMovies(data.movies);
                    } else {
                         console.log(typeof movies);
                    }
               });
     }, [movies, setMovies]);

     return !movies.length <= 0 ? (
          <Container fluid as={Row} className="px-5">
               {movies.map((movie) => (
                    <div className="col-md-4 p-3" key={movie._id}>
                         <Card className="border border-warning">
                              <Card.Body>
                                   <Card.Title>{movie.title}</Card.Title>
                                   <Card.Text>{movie.description}</Card.Text>
                                   <Card.Text>Director: {movie.director}</Card.Text>
                                   <Card.Text>Year: {movie.year}</Card.Text>
                                   <Card.Text>Genre: {movie.genre}</Card.Text>
                                   <BtnViewMovie Id={movie._id} />
                              </Card.Body>
                         </Card>
                    </div>
               ))}
          </Container>
     ) : (
          <h3 className="d-flex justify-content-center my-5 py-5 text-dark">
               Getting your &nbsp;<span className="text-warning">movies...</span>
          </h3>
     );
}
