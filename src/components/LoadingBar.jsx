import React from 'react';

const LoadingBar = ({ percent, text }) => {
  return <div className="loading-bar">
    <span className="percent">
      {percent}%
    </span>
    <p className="text">
      {text}
    </p>
    <div className="bar">
      <div style={{ width: `${percent}%` }}>
        &nbsp;
      </div>
    </div>
  </div>
}

export default LoadingBar;
