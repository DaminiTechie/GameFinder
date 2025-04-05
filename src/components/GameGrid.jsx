import { useSelector } from "react-redux";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import GameCard from "./GameCard";

const GameGrid = () => {
  const { games, status, error } = useSelector((state) => state.games);

  if (status === "loading") return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

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
