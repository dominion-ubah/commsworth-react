import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null };
    }
    
    componentDidCatch(error, errorInfo) {
      // Catch errors in any components below and re-render with error message
      this.setState({
        error: error,
        errorInfo: errorInfo
      })
      // You can also log error messages to an error reporting service here
    }

  render() {
    if (this.state.errorInfo) {
      return (
        <div className="main-section">
          <h1 className="form-header-2 "> Ooops!! Something went wrong.</h1>
          <br/>
          <p>
            Our team has been notified,
            <br/> but 
            <Link to="/login"> click here </Link> to return to the Login Page
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;