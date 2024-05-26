import React from 'react';
import './Legend.css';
import markerIconBlue from 'leaflet/dist/images/marker-icon-2x.png'; 

const Legend = ({ kecamatanColors }) => {
  return (
    <div className="legend">
      <h4>Legenda</h4>
      <hr />
      <ul>
        <li>
          <img width={20} height={24} src={markerIconBlue} alt="Pondok Pesantren" className="legend-icon" />
          <span className="legend-text">Pondok Pesantren</span>
        </li>
        <li><span className="marker-icon" style={{ backgroundColor: 'brown' }}></span> Kab Jombang</li>
        {Object.entries(kecamatanColors).map(([kecamatan, color]) => (
          <li key={kecamatan}>
            <span className="marker-icon" style={{ backgroundColor: color }}></span> {kecamatan}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Legend;
