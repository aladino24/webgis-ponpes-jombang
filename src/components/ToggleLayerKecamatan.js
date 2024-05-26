import React from 'react';
import './ToggleLayerKecamatan.css';

const ToggleLayerKecamatan = ({ label, isChecked, onToggle }) => {
  return (
    <div className="toggle-layer-kecamatan" style={{ position: 'absolute', top: '10px', left: '10px' }}>
      <label>
        <input type="checkbox" checked={isChecked} onChange={onToggle} />
        {label}
      </label>
    </div>
  );
};

export default ToggleLayerKecamatan;
