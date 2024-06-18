import { Button, Form, Col, Row, Container } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
     const { user, setUser } = useContext(UserContext);
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [validation, setValidation] = useState(false);

     console.log(email, password);

     const authenticate = (e) => {
          e.preventDefault();

          fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
               method: "POST",
               body: JSON.stringify({
                    email,
                    password,
               }),
               headers: {
                    "Content-type": "application/json",
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);

                    localStorage.setItem("token", data.access);
                    console.log(localStorage.getItem("token"));
                    retrieveUserDetails(data.access);
                    if (!data.access || data.message === "No email found") {
                         Swal.fire({
                              icon: "erorr",
                              title: "Error",
                              text: data.message || data.error,
                         });
                    } else {
                         Swal.fire({
                              icon: "success",
                              title: "Success",
                              text: data.message,
                         });
                    }
               });
     };

     const retrieveUserDetails = (token) => {
          fetch(`${process.env.REACT_APP_API_URL}/users/`, {
               headers: {
                    "Content-type": "application/json",
                    authorization: `Bearer ${token}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);
                    if (data.message === "No user found") {
                         Swal.fire({
                              icon: "erorr",
                              title: "Error",
                              text: data.message || data.error,
                         });
                    } else {
                         setUser({
                              id: data._id,
                              isAdmin: data.isAdmin,
                         });
                    }
               });
     };

     useEffect(() => {
          if (email !== "" || password !== "") {
               console.log(validation);
               setValidation(true);
          } else {
               setValidation(false);
          }
     }, [email, password]);

     return user.id ? (
          <Navigate to={"/"} />
     ) : (
          <Container fluid className="fullHeightAndWidth d-flex flex-column justify-content-center ps-md-5">
               <Form validated={validation} onSubmit={(e) => authenticate(e)}>
                    <Row className="mb-3 d-flex flex-column">
                         <Form.Group as={Col} md="4" controlId="emailForm">
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                   required
                                   type="email"
                                   placeholder="email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                              />
                         </Form.Group>
                         <Form.Group as={Col} md="4" controlId="passwordForm">
                              <Form.Label>password</Form.Label>
                              <Form.Control
                                   required
                                   type="password"
                                   placeholder="password"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                              />
                         </Form.Group>
                    </Row>
                    <Button type="submit" className="bg-dark border border-warning text-warning">
                         Login
                    </Button>
               </Form>
          </Container>
     );
}
