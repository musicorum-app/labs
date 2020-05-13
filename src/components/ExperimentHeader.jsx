import React from 'react';

const ExperimentHeader = ({name, description}) => {
  return <div className="experiment-header">
    <p className="header">{name}</p>
    <p className="decription">{description}</p>
  </div>
}

export default ExperimentHeader;
