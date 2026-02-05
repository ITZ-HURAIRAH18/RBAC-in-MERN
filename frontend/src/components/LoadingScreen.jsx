import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-container">
        {/* Water Clock Animation */}
        <div className="water-clock">
          {/* Top Container */}
          <div className="water-container top-container">
            <div className="water-level top-water"></div>
            <div className="water-drops">
              <div className="drop drop-1"></div>
              <div className="drop drop-2"></div>
              <div className="drop drop-3"></div>
            </div>
          </div>

          {/* Connecting Tube */}
          <div className="tube">
            <div className="water-flow"></div>
          </div>

          {/* Bottom Container */}
          <div className="water-container bottom-container">
            <div className="water-level bottom-water"></div>
          </div>

          {/* Clock Base */}
          <div className="clock-base"></div>
        </div>

        {/* Loading Text */}
        <div className="loading-text">
          <h2 className="loading-title">Loading RBAC System</h2>
          <p className="loading-subtitle">Please wait while we prepare everything...</p>
          <div className="loading-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
