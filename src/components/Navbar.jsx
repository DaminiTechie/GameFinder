import { useState, useEffect } from 'react';
import { Navbar as BootstrapNavbar, Form, InputGroup, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaGamepad } from 'react-icons/fa';
import { UserButton, SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import '../styles/Navbar.css';

const API_KEY = "dbb047ced4114becacf6ba4e979d120c";

const logoVariants = {
  hidden: {
    y: -100,
    rotate: -20
  },
  visible: {
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10,
      mass: 0.5,
      velocity: 2
    }
  },
  shake: {
    rotate: [0, -5, 5, -5, 5, 0],
    transition: {
      delay: 0.5,
      duration: 0.5
    }
  }
};

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
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
      const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${searchQuery}&page_size=5`);
      setSuggestions(response.data.results);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
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
      bg="transparent"
      expand="lg"
      className="px-4 py-3 position-sticky top-0 z-3 navbar-custom"
    >
     
      <motion.div
        initial="hidden"
        animate={["visible", "shake"]}
        variants={logoVariants}
      >
        <BootstrapNavbar.Brand as={Link} to="/" className="navbar-brand me-4">
          <motion.div whileHover={{ scale: 1.1 }}>
            <FaGamepad size={28} className="text-glow me-2" />
          </motion.div>
          <span className="brand-gradient fw-bold">GameFinder</span>
        </BootstrapNavbar.Brand>
      </motion.div>

     
      <div className="flex-grow-1 mx-4 position-relative">
        <Form onSubmit={handleSearch}>
          <InputGroup className="custom-search-bar">
            <span className="search-icon">
              <FaSearch />
            </span>
            <Form.Control
              type="search"
              placeholder="Search games..."
              className="custom-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                setIsSearchFocused(true);
                setShowSuggestions(true);
              }}
              onBlur={() => {
                setTimeout(() => setShowSuggestions(false), 200);
                setIsSearchFocused(false);
              }}
            />
          </InputGroup>
        </Form>

    
        {showSuggestions && suggestions.length > 0 && (
          <div className="suggestions-dropdown">
            {suggestions.map(game => (
              <Link
                key={game.id}
                to={`/game/${game.id}`}
                className="suggestion-item"
                onMouseDown={(e) => e.preventDefault()}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={game.background_image || "https://via.placeholder.com/50"}
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

     
      <div className="d-flex align-items-center gap-2">
        <SignedIn>
          <Button variant="link" className="text-white me-2" onClick={() => navigate('/library')}>
            MyLibrary
          </Button>
          <UserButton signOutOptions={{ redirectUrl: "/" }} />
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="outline-light" size="sm" className="me-2">Login</Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button variant="primary" size="sm">Sign Up</Button>
          </SignUpButton>
        </SignedOut>
      </div>
    </BootstrapNavbar>
  );
}

export default Navbar;
