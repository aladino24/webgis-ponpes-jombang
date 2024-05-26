// src/MapComponent.js
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import Legend from './Legend';
import './MapComponent.css';
import FilterForm from './FilterForm';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = () => {
  const [markers, setMarkers] = useState([
    { position: [51.505, -0.09], district: 'Kecamatan1', category: 'Kategori1', status: 'Aktif' },
  ]);
  const [filteredMarkers, setFilteredMarkers] = useState(markers);

  const handleFilter = (filters) => {
    const { district, category, status } = filters;
    let filtered = markers;

    if (district) {
      filtered = filtered.filter(marker => marker.district === district);
    }
    if (category) {
      filtered = filtered.filter(marker => marker.category === category);
    }
    if (status) {
      filtered = filtered.filter(marker => marker.status === status);
    }

    setFilteredMarkers(filtered);
  };

  return (
    <div className="map-container">
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {filteredMarkers.map((marker, index) => (
          <Marker key={index} position={marker.position}>
            <Popup>
              <div>
                <strong>Kecamatan:</strong> {marker.district}<br />
                <strong>Kategori:</strong> {marker.category}<br />
                <strong>Status:</strong> {marker.status}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <Legend />
      <FilterForm onFilter={handleFilter} style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }} />
    </div>
  );
};

export default MapComponent;
