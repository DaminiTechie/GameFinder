import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import { Container, Row, Col, Alert, Button, Form } from 'react-bootstrap';
import { addFavorite, removeFavorite, clearFavorites } from '../store/favoritesSlice';
import GameCard from '../components/GameCard';

const Library = () => {
  const libraryGames = useSelector(state => state.favorites);
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState('added');

  const handleClearLibrary = () => {
    if (window.confirm('Are you sure you want to clear your entire library?')) {
      dispatch(clearFavorites());
    }
  };

  const toggleLibrary = (game) => {
    if (libraryGames.some(libGame => libGame.id === game.id)) {
      dispatch(removeFavorite(game.id));
    } else {
      dispatch(addFavorite({
        ...game,
        addedDate: new Date().toISOString(),
        userTags: []
      }));
    }
  };

  const sortedGames = useMemo(() => {
    return [...libraryGames].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return new Date(b.addedDate || 0) - new Date(a.addedDate || 0);
    });
  }, [libraryGames, sortBy]);

  return (
    <Container className="py-4">
   
      <SignedIn>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>My Game Library</h1>
          {libraryGames.length > 0 && (
            <Button variant="danger" onClick={handleClearLibrary}>
              Clear Library
            </Button>
          )}
        </div>

        {libraryGames.length === 0 ? (
          <Alert variant="info">
            Your library is empty. Add games by clicking the "Add to Library" button.
            <div className="mt-2">
              <Button variant="primary" href="/">Explore Games</Button>
            </div>
          </Alert>
        ) : (
          <>
        
            <div className="mb-3">
              <Form.Select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                style={{ width: '200px' }}
              >
                <option value="added">Recently Added</option>
                <option value="name">Alphabetical</option>
                <option value="rating">Highest Rated</option>
              </Form.Select>
            </div>

     
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
              {sortedGames.map(game => (
                <Col key={game.id}>
                  <GameCard game={game} onToggleLibrary={() => toggleLibrary(game)} />
                </Col>
              ))}
            </Row>
          </>
        )}
      </SignedIn>

     
      <SignedOut>
        <Alert variant="warning" className="mt-4 text-center">
          <h4>Sign in to access your game library</h4>
          <p>Your saved games will appear here after you sign in.</p>
          <SignInButton mode="modal">
            <Button variant="primary">Sign In</Button>
          </SignInButton>
        </Alert>
      </SignedOut>
    </Container>
  );
};

export default Library;
