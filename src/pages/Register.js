import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";

export default function Register() {
     const [name, setName] = useState("");
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [confirmPassword, setConfirmPassword] = useState("");

     const [isActive, setIsActive] = useState(false);
     console.log(name, email, password, confirmPassword);

     function registerUser(e) {
          e.preventDefault();
          console.log("register");
          fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
               }),
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);

                    if (data.message === "User Registered Successfully") {
                         setName("");
                         setEmail("");
                         setPassword("");
                         setConfirmPassword("");

                         Swal.fire({
                              title: "Registration Successful",
                              icon: "success",
                              text: "Thank you for registering!",
                         });
                    } else {
                         Swal.fire({
                              title: "Registration Failed",
                              icon: "error",
                              text: data.message || data.error,
                         });
                    }
               });
     }

     useEffect(() => {
          if (
               email !== "" &&
               name !== "" &&
               password !== "" &&
               confirmPassword !== "" &&
               password === confirmPassword
          ) {
               setIsActive(true);
               console.log(isActive);
          } else {
               setIsActive(false);
               console.log(isActive);
          }
     }, [isActive, name, email, password, confirmPassword]);

     return (
          <Container fluid className="fullHeightAndWidth d-flex flex-column justify-content-center ps-md-5">
               <Form onSubmit={(e) => registerUser(e)}>
                    <Row className="mb-3 d-flex flex-column">
                         <h1 className="my-4 text-dark">Register</h1>
                         <Form.Group as={Col} md="4">
                              <Form.Label>Name:</Form.Label>
                              <Form.Control
                                   type="text"
                                   placeholder="Enter name"
                                   required
                                   value={name}
                                   onChange={(e) => {
                                        setName(e.target.value);
                                   }}
                              />
                         </Form.Group>
                         <Form.Group as={Col} md="4">
                              <Form.Label>Email:</Form.Label>
                              <Form.Control
                                   type="email"
                                   placeholder="Enter email"
                                   required
                                   value={email}
                                   onChange={(e) => {
                                        setEmail(e.target.value);
                                   }}
                              />
                         </Form.Group>
                         <Form.Group as={Col} md="4">
                              <Form.Label>Password:</Form.Label>
                              <Form.Control
                                   type="password"
                                   placeholder="Enter password"
                                   required
                                   value={password}
                                   onChange={(e) => {
                                        setPassword(e.target.value);
                                   }}
                              />
                         </Form.Group>
                         <Form.Group as={Col} md="4">
                              <Form.Label>Confirm Password:</Form.Label>
                              <Form.Control
                                   type="password"
                                   placeholder="Confirm Password"
                                   required
                                   value={confirmPassword}
                                   onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                   }}
                              />
                         </Form.Group>
                    </Row>
                    {isActive ? (
                         <Button type="submit" className="bg-warning border border-dark text-dark buttonRegister">
                              Register
                         </Button>
                    ) : (
                         <Button
                              type="submit"
                              className="bg-warning border border-dark text-dark buttonRegister"
                              disabled
                         >
                              Register
                         </Button>
                    )}
               </Form>
          </Container>
     );
}
