import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GameDetails from "./pages/GameDetails";
import MyLibrary from "./pages/Library";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import ErrorBoundary from "./components/ErrorBoundary";
import NeonBackground from './components/NeonBackground';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";

function App() {
  return (
    <>
      <NeonBackground />
      <main className="container py-4" style={{ position: "relative", zIndex: 2 }}>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game/:id" element={<GameDetails />} />
            <Route
              path="/library"
              element={
                <>
                  <SignedIn>
                    <MyLibrary />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
          </Routes>
        </ErrorBoundary>
      </main>
    </>
  );
}

export default App;