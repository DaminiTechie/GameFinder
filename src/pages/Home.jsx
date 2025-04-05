import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import Filters from "../components/Filters";
import NavBar from "../components/Navbar";
import GameCard from "../components/GameCard";
import axios from "axios";
import "../styles/Home.css"; 

const API_KEY = "dbb047ced4114becacf6ba4e979d120c";
const platformIcons = ["🎮", "🕹️", "👾", "🎯", "🧩", "🖥️"];

function Home() {
  const [games, setGames] = useState([]);
  const [filters, setFilters] = useState({
    genre: "",
    year: "",
    ordering: "-rating",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [randomPlatformIcon, setRandomPlatformIcon] = useState("🎮");

  
  useEffect(() => {
    const interval = setInterval(() => {
      setRandomPlatformIcon(
        platformIcons[Math.floor(Math.random() * platformIcons.length)]
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

 
  useEffect(() => {
    let isMounted = true;

    const fetchGames = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          key: API_KEY,
          page: page,
          page_size: "12",
        });
        if (filters.genre) params.append("genres", filters.genre);
        if (filters.year)
          params.append("dates", `${filters.year}-01-01,${filters.year}-12-31`);
        if (filters.ordering) params.append("ordering", filters.ordering);
        if (searchQuery) params.append("search", searchQuery);

        const response = await axios.get(
          `https://api.rawg.io/api/games?${params.toString()}`
        );

        if (isMounted) {
          setGames(response.data.results || []);
          setTotalPages(Math.max(1, Math.ceil(response.data.count / 12)));
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load games. Please try again.");
          setGames([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchGames();
    return () => {
      isMounted = false;
    };
  }, [filters, searchQuery, page]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <Container fluid className="home-container">
      <NavBar onSearch={setSearchQuery} />

    
      {!searchQuery && !filters.genre && !filters.year && (
        <motion.div
          className="hero-section text-center py-5 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="hero-title">
            <span className="hero-icon">{randomPlatformIcon}</span>
            <span className="gradient-text">Explore Infinite</span>
            <br />
            Gaming Worlds
          </h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Discover, track, and build your ultimate collection
          </motion.p>
        </motion.div>
      )}

     
      <motion.div
        key={`header-${searchQuery}-${filters.genre}-${filters.year}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="section-header"
      >
        {searchQuery ? (
          <h2>
            Search Results for: <span className="query-text">"{searchQuery}"</span>
          </h2>
        ) : filters.genre || filters.year ? (
          <h2>
            {filters.genre ? `${filters.genre} ` : ""}
            Games{filters.year ? ` from ${filters.year}` : ""}
          </h2>
        ) : (
          <h2>Featured Titles</h2>
        )}
        {games.length > 0 && (
          <p className="results-count">
            Showing {games.length} of {totalPages * 12} games
          </p>
        )}
      </motion.div>

      
      <Row>
        <Col md={3}>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Filters onFilterChange={handleFilterChange} />
          </motion.div>
        </Col>

        <Col md={9}>
     
          {loading && (
            <motion.div
              className="loading-state text-center py-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Spinner animation="grow" variant="primary" />
              <p>Loading your games...</p>
            </motion.div>
          )}

          
          {error && (
            <motion.div
              className="error-state"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
            >
              <Alert variant="danger" className="glow-error">
                <Alert.Heading>Connection Error</Alert.Heading>
                <p>{error}</p>
                <Button variant="outline-danger" onClick={() => window.location.reload()}>
                  Retry
                </Button>
              </Alert>
            </motion.div>
          )}

        
          {!loading && !error && (
            <>
              <AnimatePresence>
                <Row>
                  {games.length > 0 ? (
                    games.map((game) => (
                      <Col key={game.id} md={4} className="mb-4">
                        <motion.div
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <GameCard game={game} />
                        </motion.div>
                      </Col>
                    ))
                  ) : (
                    <motion.div
                      className="no-results text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <h4>No games found</h4>
                      <p>Try adjusting your filters or search query</p>
                      <Button
                        variant="outline-primary"
                        onClick={() => {
                          setSearchQuery("");
                          setFilters({
                            genre: "",
                            year: "",
                            ordering: "-rating",
                          });
                        }}
                      >
                        Reset Filters
                      </Button>
                    </motion.div>
                  )}
                </Row>
              </AnimatePresence>

            
              {games.length > 0 && (
                <motion.div
                  className="pagination-controls text-center mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Button
                    variant="outline-primary"
                    disabled={page === 1}
                    onClick={() => setPage(1)}
                    className="mx-1"
                  >
                    First
                  </Button>
                  <Button
                    variant="outline-primary"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="mx-1"
                  >
                    Previous
                  </Button>
                  <span className="page-indicator mx-2">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="primary"
                    onClick={() => setPage(page + 1)}
                    disabled={page >= totalPages}
                    className="mx-1"
                  >
                    Next
                  </Button>
                </motion.div>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
