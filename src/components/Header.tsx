import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const { state } = useCart();
  const location = useLocation();

  return (
    <Navbar bg="white" expand="lg" sticky="top" className="shadow-sm border-bottom">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3 text-primary">
          StyleHub
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={location.pathname === '/' ? 'active fw-semibold' : ''}
            >
              Shop
            </Nav.Link>
            <Nav.Link href="#categories">Categories</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
          
          <Nav className="align-items-center">
            <Nav.Link className="position-relative me-2">
              <Search size={20} />
            </Nav.Link>
            <Nav.Link className="me-2">
              <User size={20} />
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" className="position-relative">
              <ShoppingCart size={20} />
              {state.itemCount > 0 && (
                <Badge 
                  bg="danger" 
                  className="position-absolute top-0 start-100 translate-middle rounded-pill"
                >
                  {state.itemCount}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;