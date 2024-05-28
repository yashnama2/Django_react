import Container from 'react-bootstrap/Container';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [localStorage.getItem('token')]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userData');
        setIsLoggedIn(false);
        navigate('/'); // Redirect to login page after logout
    };

    return (
        <Navbar sticky="top" expand="lg" className="bg-body-tertiary ps-4">
            <Navbar.Brand as={Link} to='/'>
                <img
                    alt=""
                    src={'/images/blog.png'}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}Blog It</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
                    <Nav.Link as={Link} to='/profile'>Profile</Nav.Link>
                    {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Separated link
                        </NavDropdown.Item>
                    </NavDropdown> */}
                </Nav>
                {isLoggedIn ? (
                    <Nav>
                        <Link to="/" className="btn btn-outline-dark mx-2 rounded-pill" onClick={handleLogout} >Logout</Link>
                    </Nav>
                ) : null}
            </Navbar.Collapse>
        </Navbar>

    )
}