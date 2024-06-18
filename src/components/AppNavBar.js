import { useContext } from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import UserContext from "../UserContext";
import { Link } from "react-router-dom";

export default function AppNavBar() {
     const { user } = useContext(UserContext);
     return (
          <>
               <Navbar key="sm" expand="sm" className="bg-dark mb-3">
                    <Container fluid>
                         <Navbar.Brand className="text-light">
                              Movies<span className="text-warning">hub</span>
                         </Navbar.Brand>
                         <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} className="bg-warning" />
                         <Navbar.Offcanvas
                              id={`offcanvasNavbar-expand-sm`}
                              aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
                              placement="end"
                              className="bg-dark"
                         >
                              <Offcanvas.Header closeButton>
                                   <Offcanvas.Title className="text-warning" id={`offcanvasNavbarLabel-expand-sm`}>
                                        Offcanvas
                                   </Offcanvas.Title>
                              </Offcanvas.Header>
                              <Offcanvas.Body>
                                   <Nav className="justify-content-end flex-grow-1 pe-3">
                                        <Nav.Link
                                             className="text-warning border border-warning rounded-1"
                                             as={Link}
                                             to={"/"}
                                        >
                                             Home
                                        </Nav.Link>
                                        {!user.isAdmin ? (
                                             <Nav.Link className="text-warning" as={Link} to="/movies">
                                                  Movies
                                             </Nav.Link>
                                        ) : (
                                             <Nav.Link className="text-warning" as={Link} to="/adminView">
                                                  Movies
                                             </Nav.Link>
                                        )}

                                        {!user.id ? (
                                             <>
                                                  <Nav.Link className="text-warning" as={Link} to="/login">
                                                       Login
                                                  </Nav.Link>
                                                  <Nav.Link className="text-warning" as={Link} to="/register">
                                                       Register
                                                  </Nav.Link>
                                             </>
                                        ) : (
                                             <Nav.Link className="text-warning" as={Link} to="/logout">
                                                  Logout
                                             </Nav.Link>
                                        )}
                                   </Nav>
                              </Offcanvas.Body>
                         </Navbar.Offcanvas>
                    </Container>
               </Navbar>
          </>
     );
}
