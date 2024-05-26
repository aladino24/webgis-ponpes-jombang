import React from 'react';
import './Legend.css';

const Legend = () => {
  return (
    <div className="legend">
      <h4>Legend</h4>
      <ul>
        <li><span className="marker-icon" style={{ backgroundColor: 'blue' }}></span> Marker 1</li>
        <li><span className="marker-icon" style={{ backgroundColor: 'red' }}></span> Marker 2</li>
        <li><span className="marker-icon" style={{ backgroundColor: 'green' }}></span> Marker 3</li>
      </ul>
    </div>
  );
};

export default Legend;
