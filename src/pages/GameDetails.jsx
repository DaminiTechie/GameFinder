import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Alert, Tab, Tabs } from 'react-bootstrap';
import { fetchGameDetails, fetchGameScreenshots } from '../api/rawg';

function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGameDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
     
        const [details, screenshots] = await Promise.all([
          fetchGameDetails(id),
          fetchGameScreenshots(id)
        ]);
        
        setGame(details);
        setScreenshots(screenshots.results || []);
      } catch (err) {
        console.error("Error loading game details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadGameDetails();
  }, [id]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="py-4">
      <Row>
        <Col lg={8}>
          <h1>{game.name}</h1>
          
          <div className="mb-3">
            {game.platforms?.map(platform => (
              <Badge key={platform.platform.id} bg="secondary" className="me-2">
                {platform.platform.name}
              </Badge>
            ))}
          </div>

          <Tabs defaultActiveKey="description" className="mb-3">
            <Tab eventKey="description" title="Description">
              <div 
                className="mt-3" 
                dangerouslySetInnerHTML={{ __html: game.description || 'No description available' }}
              />
            </Tab>
            <Tab eventKey="details" title="Details">
              <div className="mt-3">
                <p><strong>Release Date:</strong> {game.released || 'TBA'}</p>
                <p><strong>Developer:</strong> {game.developers?.map(d => d.name).join(", ") || 'Unknown'}</p>
                <p><strong>Publisher:</strong> {game.publishers?.map(p => p.name).join(", ") || 'Unknown'}</p>
                <p><strong>Rating:</strong> {game.rating ? `${game.rating.toFixed(1)}/5` : 'N/A'}</p>
              </div>
            </Tab>
          </Tabs>
        </Col>

        <Col lg={4}>
          <Card className="mb-4">
            <Card.Img 
              variant="top" 
              src={game.background_image || "https://via.placeholder.com/400x225"} 
              alt={game.name}
            />
            <Card.Body>
              <Card.Title>Game Info</Card.Title>
              <Card.Text>
                <strong>Genres:</strong> {game.genres?.map(g => g.name).join(", ") || 'Unknown'}
                <br />
                <strong>Playtime:</strong> {game.playtime ? `${game.playtime} hours` : 'Unknown'}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {screenshots.length > 0 && (
        <Row className="mt-4">
          <h3>Screenshots</h3>
          {screenshots.map(screenshot => (
            <Col key={screenshot.id} xs={6} md={4} lg={3} className="mb-3">
              <img 
                src={screenshot.image} 
                alt={`${game.name} screenshot`} 
                className="img-fluid rounded shadow-sm"
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default GameDetails;