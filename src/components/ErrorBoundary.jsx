// src/components/ErrorBoundary.jsx
import React from 'react';
import { Alert } from 'react-bootstrap';

class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert variant="danger" className="m-4">
          Something went wrong with this component. Please try refreshing the page.
        </Alert>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;