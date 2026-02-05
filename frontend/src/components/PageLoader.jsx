import React from 'react';
import './PageLoader.css';

const PageLoader = ({ message = "Loading..." }) => {
  return (
    <div className="page-loader">
      <div className="loader-content">
        {/* Animated Spinner */}
        <div className="spinner-container">
          <div className="spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-core"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="loader-text">
          <h3>{message}</h3>
          <div className="loader-dots">
            <span className="loader-dot"></span>
            <span className="loader-dot"></span>
            <span className="loader-dot"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
