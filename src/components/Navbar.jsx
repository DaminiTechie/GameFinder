import { useState, useEffect } from 'react';
import {
  Navbar as BootstrapNavbar,
  Form,
  Button,
  Offcanvas,
  Container,
  Nav,
  Dropdown,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaGamepad, FaBars } from 'react-icons/fa';
import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import '../styles/Navbar.css';

const API_KEY = 'dbb047ced4114becacf6ba4e979d120c';


function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim() !== '') {
        fetchSuggestions();
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchSuggestions = async () => {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&search=${searchQuery}&page_size=5`
      );
      setSuggestions(response.data.results);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/search?query=${searchQuery}`);
      setShowSuggestions(false);
    }
  };

  return (
    <BootstrapNavbar
      bg="dark"
      expand="lg"
      variant="dark"
      className="px-3 py-2 position-sticky top-0 z-3 navbar-custom"
    >
      <Container fluid>
       
        <div className="d-none d-lg-flex w-100 align-items-center justify-content-between">
        
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <BootstrapNavbar.Brand as={Link} to="/" className="me-4 neon-logo d-flex align-items-center">
              <FaGamepad className="text-glow me-2 fs-4" />
              <span className="brand-gradient fw-bold fs-4">GameFinder</span>
            </BootstrapNavbar.Brand>
          </motion.div>

          
          <div className="flex-grow-1 mx-4 position-relative" style={{ maxWidth: '700px' }}>
            <Form onSubmit={handleSearch}>
              <div className="search-wrapper">
                <div className="custom-search-bar rounded-pill px-3">
                  <FaSearch className="search-icon inside-icon" />
                  <input
                    type="text"
                    className="custom-search-input ps-5"
                    placeholder="Search games..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  />
                </div>
              </div>
            </Form>
            {showSuggestions && suggestions.length > 0 && (
              <div className="suggestions-dropdown">
                {suggestions.map((game) => (
                  <Link
                    key={game.id}
                    to={`/game/${game.id}`}
                    className="suggestion-item"
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={game.background_image || 'https://via.placeholder.com/50'}
                        alt={game.name}
                        width="40"
                        height="40"
                        className="rounded me-2"
                      />
                      <div>
                        <div className="suggestion-title">{game.name}</div>
                        <div className="suggestion-meta">
                          {game.released && new Date(game.released).getFullYear()}
                          {game.genres?.[0] && ` • ${game.genres[0].name}`}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

         
          <div className="d-flex align-items-center gap-3">
            <SignedIn>
              <Button variant="neon" onClick={() => navigate('/library')}>
                MyLibrary
              </Button>
              <UserButton className="neon-account" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="neon-outline">Login</Button>
              </SignInButton>
             <SignUpButton mode="modal">
  <Button variant="neon-outline" block className="text-white">Sign Up</Button>
</SignUpButton>

            </SignedOut>
          </div>
        </div>

        
        <div className="d-lg-none d-flex w-100 align-items-center justify-content-between">
          <BootstrapNavbar.Brand as={Link} to="/" className="me-2 neon-logo">
            <FaGamepad className="text-glow fs-4" />
          </BootstrapNavbar.Brand>

          <div className="flex-grow-1 mx-2 position-relative">
            <Form onSubmit={handleSearch}>
              <div className="custom-search-bar mobile-search rounded-pill px-3">
                <FaSearch className="search-icon inside-icon" />
                <input
                  type="text"
                  className="custom-search-input ps-5"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </Form>
          </div>

          <Button
            variant="neon-outline"
            className="p-2"
            onClick={() => setShowMenu(true)}
          >
            <FaBars />
          </Button>
        </div>

      
        <Offcanvas show={showMenu} onHide={() => setShowMenu(false)} placement="end">
        <Offcanvas.Header closeButton className="neon-border" closeVariant="black">
  <Offcanvas.Title className="brand-gradient">Menu</Offcanvas.Title>
</Offcanvas.Header>

          <Offcanvas.Body className="d-flex flex-column gap-3 neon-bg">
            <SignedIn>
              <Button variant="neon" onClick={() => navigate('/library')}>
                MyLibrary
              </Button>
              <div className="d-flex justify-content-center">
                <UserButton />
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="neon" block>Login</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button variant="neon-outline" block>Sign Up</Button>
              </SignUpButton>
            </SignedOut>
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;



