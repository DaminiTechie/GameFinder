import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/favoritesSlice";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Card, Button, Badge, Stack, Tooltip, Overlay } from "react-bootstrap";
import { FaPlay, FaStar, FaBookmark, FaRegBookmark, FaChevronDown } from "react-icons/fa";
import "../styles/GameCard.css"; 
const GameCard = ({ game }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const isFavorite = favorites.some((favGame) => favGame.id === game.id);

  const [showVideo, setShowVideo] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);

  const toggleFavorite = () => {
    isFavorite
      ? dispatch(removeFavorite(game.id))
      : dispatch(addFavorite(game));
  };

  const getYouTubeId = (clip) => {
    if (!clip) return "";
    const match = clip.clip?.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
    );
    return match ? match[1] : "";
  };

  return (
    <Card className="game-card neon-card shadow-sm mb-4">
   
      <div className="position-relative card-media-container" onClick={() => setShowVideo(!showVideo)}>
        {showVideo && game.clip ? (
          <iframe
            src={`https://www.youtube.com/embed/${getYouTubeId(game.clip)}?autoplay=1&mute=1`}
            className="card-media"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={game.name}
          />
        ) : (
          <>
            <Card.Img
              variant="top"
              src={game.background_image || "https://via.placeholder.com/300x180"}
              alt={game.name}
              className="card-media"
            />
            <div className="play-button-overlay">
              <Button variant="dark" className="play-button glow-button">
                <FaPlay className="neon-icon" />
              </Button>
            </div>
          </>
        )}
        <div className="card-media-glow" />
      </div>

   
      <Card.Body className="card-body-neon">
        <Stack direction="horizontal" className="justify-content-between mb-3">
          <div className="d-flex gap-2">
            <Badge bg="dark" className="neon-badge">#{game.rank || "N/A"}</Badge>
            <Badge bg="dark" className="neon-badge-accent">
              {game.released?.split("-")[0] || "2025"}
            </Badge>
          </div>
          <div className="rating-display">
            <FaStar className="text-warning neon-icon" />
            <span className="rating-value">{game.rating?.toFixed(1) || "N/A"}</span>
          </div>
        </Stack>

        <Card.Title className="neon-title mb-3">{game.name}</Card.Title>

        <Stack gap={3} className="mb-3 neon-details">
          <div>
            <small className="text-neon-secondary">Release date</small>
            <div className="text-neon-primary">{game.released || "TBA"}</div>
          </div>
          <div>
            <small className="text-neon-secondary">Genres</small>
            <div className="genre-container">
              {game.genres?.slice(0, 2).map((genre) => (
                <Badge key={genre.id} className="genre-badge">{genre.name}</Badge>
              ))}
              {game.genres?.length > 2 && (
                <Badge className="genre-badge-more">+{game.genres.length - 2}</Badge>
              )}
            </div>
          </div>
        </Stack>

        
        <div className="d-flex justify-content-between button-row">
          <Button as={Link} to={`/game/${game.id}`} className="details-button glow-button" size="sm">
            Details
          </Button>
          <Button
            variant="link"
            size="sm"
            className="toggle-button"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show less" : "Show more"} <FaChevronDown />
          </Button>
        </div>

        
        {expanded && (
          <div className="expanded-section">
            <h6 className="neon-heading">Similar Games</h6>
            <div className="text-neon-secondary">Show more like this</div>
          </div>
        )}
      </Card.Body>

   
      <Card.Footer className="card-footer-neon">
        <SignedIn>
          <Button
            variant={isFavorite ? "primary" : "outline-primary"}
            onClick={toggleFavorite}
            className={`w-100 favorite-button ${isFavorite ? 'glow-active' : 'glow-hover'}`}
          >
            {isFavorite ? (
              <>
                <FaBookmark className="me-1 neon-icon" /> In Library
              </>
            ) : (
              <>
                <FaRegBookmark className="me-1 neon-icon" /> Add to Library
              </>
            )}
          </Button>
        </SignedIn>

        <SignedOut>
          <div ref={tooltipRef}>
            <Button
              variant="outline-primary"
              className="w-100 favorite-button glow-hover"
              onClick={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <FaRegBookmark className="me-1 neon-icon" /> Add to Library
            </Button>
          </div>
          <Overlay target={tooltipRef.current} show={showTooltip} placement="top">
            {(props) => (
              <Tooltip id="library-tooltip" {...props} className="neon-tooltip">
                Sign in to save games
              </Tooltip>
            )}
          </Overlay>
        </SignedOut>
      </Card.Footer>
    </Card>
  );
};

export default GameCard;
