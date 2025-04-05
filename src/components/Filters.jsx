import { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const API_KEY = "dbb047ced4114becacf6ba4e979d120c";

function Filters({ onFilterChange }) {
  const [genres, setGenres] = useState([]);
  const [filters, setFilters] = useState({
    genre: "",
    year: "",
    ordering: "-rating"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.rawg.io/api/genres?key=${API_KEY}`
        );
        setGenres(response.data.results);
      } catch (err) {
        setError("Failed to load genres");
        console.error("Genre fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGenres();
  }, []);

  const handleApplyFilters = () => {
    console.log("Applying filters:", filters); 
    onFilterChange(filters);
  };

  return (
    <div className="p-3 border rounded bg-light">
      <h5 style={{ color: "black" }}>Filters</h5>
      
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Category Filter */}
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "black" }}>Category</Form.Label>
        <Form.Select
          value={filters.genre}
          onChange={(e) => setFilters({...filters, genre: e.target.value})}
          disabled={loading}
        >
          <option value="">All Categories</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.slug}>
              {genre.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* Release Year Filter */}
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "black" }}>Release Year</Form.Label>
        <Form.Control
          type="number"
          placeholder="e.g. 2023"
          min="1970"
          max={new Date().getFullYear()}
          value={filters.year}
          onChange={(e) => setFilters({...filters, year: e.target.value})}
        />
      </Form.Group>

      {/* Popularity Filter */}
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "black" }}>Popularity</Form.Label>
        <Form.Select
          value={filters.ordering}
          onChange={(e) => setFilters({...filters, ordering: e.target.value})}
        >
          <option value="-rating">Top Rated</option>
          <option value="-released">Newest Releases</option>
          <option value="-metacritic">Best Reviews</option>
        </Form.Select>
      </Form.Group>

      <Button 
        variant="primary" 
        onClick={handleApplyFilters}
        disabled={loading}
      >
        Apply Filters
      </Button>
    </div>
  );
}

export default Filters;