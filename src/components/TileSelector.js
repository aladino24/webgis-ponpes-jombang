// TileSelector.js
import React from 'react';

const TileSelector = ({ tileLayer, setTileLayer }) => {
  const handleChange = (event) => {
    setTileLayer(event.target.value);
  };

  return (
    <div className="tile-selector">
      <label>
        <input
          type="radio"
          value="osm"
          checked={tileLayer === "osm"}
          onChange={handleChange}
        />
        OpenStreetMap
      </label>
      <label>
        <input
          type="radio"
          value="googleSatellite"
          checked={tileLayer === "googleSatellite"}
          onChange={handleChange}
        />
        Google Satellite
      </label>
    </div>
  );
};

export default TileSelector;
