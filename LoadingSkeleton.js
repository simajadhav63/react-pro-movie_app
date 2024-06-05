import React from 'react';
import './LoadingSkeleton.css';

const LoadingSkeleton = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-card">
        <div className="skeleton-image"></div>
        <div className="skeleton-text"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
