import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGames } from "../store/gamesSlice"; 
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import GameCard from "./GameCard";

const GameGrid = () => {
  const dispatch = useDispatch();
  const { games, status, error } = useSelector((state) => state.games);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/games");
        const data = await res.json();
        dispatch(setGames(data));   // ✅ Dispatch to Redux store
        setLoading(false);          // ✅ Stop loading after data fetch
      } catch (err) {
        console.error("Failed to fetch games from Flask:", err);
        setLoading(false);          // ✅ Still stop loading even on error
      }
    };

    fetchGames();
  }, [dispatch]);

  // ✅ Show spinner while loading
  if (loading) return <Spinner animation="border" />;

  // ✅ Show error message
  if (error) return <Alert variant="danger">{error}</Alert>;

  // ✅ Render game cards
  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
      {games.map((game) => (
        <Col key={game.id}>
          <GameCard game={game} />
        </Col>
      ))}
    </Row>
  );
};

export default GameGrid;
