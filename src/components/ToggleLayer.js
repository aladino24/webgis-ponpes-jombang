import React from 'react';
import './ToggleLayer.css';

const ToggleLayer = ({ label, isChecked, onToggle }) => {
  return (
    <div className="toggle-layer" style={{ position: 'absolute', top: '10px', left: '10px' }}>
      <label>
        <input type="checkbox" checked={isChecked} onChange={onToggle} />
        {label}
      </label>
    </div>
  );
};

export default ToggleLayer;
