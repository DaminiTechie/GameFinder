import { useState } from "react";
import { Form, Button } from "react-bootstrap";

function Sidebar({ filters, setFilters }) {
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="sidebar bg-dark p-3 text-white">
      <h4>Filters</h4>
      <Form>
     
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Select name="category" onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="action">Action</option>
            <option value="adventure">Adventure</option>
            <option value="rpg">RPG</option>
          </Form.Select>
        </Form.Group>

        
        <Form.Group className="mt-2">
          <Form.Label>Release Year</Form.Label>
          <Form.Control
            type="number"
            name="releaseYear"
            placeholder="Enter year"
            onChange={handleFilterChange}
          />
        </Form.Group>

     
        <Form.Group className="mt-2">
          <Form.Label>Popularity</Form.Label>
          <Form.Select name="popularity" onChange={handleFilterChange}>
            <option value="">Any</option>
            <option value="top_rated">Top Rated</option>
            <option value="trending">Trending</option>
          </Form.Select>
        </Form.Group>

        <Button variant="light" className="mt-3">Apply Filters</Button>
      </Form>
    </div>
  );
}

export default Sidebar;
