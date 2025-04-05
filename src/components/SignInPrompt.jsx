// src/components/SignInPrompt.jsx
import { Button } from 'react-bootstrap';
import { SignInButton } from '@clerk/clerk-react';

function SignInPrompt() {
  return (
    <div className="text-center p-4 border rounded bg-light mt-3">
      <h5>Want to save games to your library?</h5>
      <p className="text-muted">Sign in to create your personal game collection</p>
      <SignInButton mode="modal">
        <Button variant="primary" className="me-2">Sign In</Button>
      </SignInButton>
      <Button variant="outline-primary">Create Account</Button>
    </div>
  );
}

export default SignInPrompt;