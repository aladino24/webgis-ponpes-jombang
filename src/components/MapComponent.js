import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import Legend from './Legend';
import './MapComponent.css';
import FilterForm from './FilterForm';
import PesantrenJombang from './pesantren_jombang.geojson';
import KabupatenJombang from './KABUPATEN_JOMBANG.geojson';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = () => {
  const [markers, setMarkers] = useState([]);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [geojsonData, setGeojsonData] = useState(null);
  const [kecamatanList, setKecamatanList] = useState([]);
  const [kelurahanList, setKelurahanList] = useState([]);

  useEffect(() => {
    fetch(PesantrenJombang)
      .then(response => response.json())
      .then(data => {
        const newMarkers = data.features.map(feature => ({
          position: [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
          name: feature.properties.nama_pesantren,
          kecamatan: feature.properties.kecamatan,
          kelurahan: feature.properties.kelurahan,
          coordinate: feature.geometry.coordinates
        }));
        setMarkers(newMarkers);
        setFilteredMarkers(newMarkers);

        const kecamatanSet = new Set();
        const kelurahanSet = new Set();
        data.features.forEach(feature => {
          kecamatanSet.add(feature.properties.kecamatan);
          kelurahanSet.add(feature.properties.kelurahan);
        });
        setKecamatanList(Array.from(kecamatanSet));
        setKelurahanList(Array.from(kelurahanSet));
      });

    fetch(KabupatenJombang)
      .then(response => response.json())
      .then(data => {
        setGeojsonData(data);
      });
  }, []);

  const handleFilter = (filters) => {
    const { kecamatan, kelurahan, status } = filters;
    let filtered = markers;

    if (kecamatan) {
      filtered = filtered.filter(marker => marker.kecamatan === kecamatan);
    }
    if (kelurahan) {
      filtered = filtered.filter(marker => marker.kelurahan === kelurahan);
    }
    if (status) {
      filtered = filtered.filter(marker => marker.status === status);
    }

    setFilteredMarkers(filtered);
  };

  return (
    <div className="map-container">
      <MapContainer center={[-7.5492, 112.2333]} zoom={11} style={{ height: "100vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {geojsonData && <GeoJSON data={geojsonData} style={() => ({
          color: 'brown',
          weight: 2,
          opacity: 0.5,
        })} />}

        {filteredMarkers.map((marker, index) => (
          <Marker key={index} position={marker.position}>
            <Popup>
              <div>
                <h4>{marker.name}</h4>
                <strong>Kecamatan:</strong> {marker.kecamatan}<br />
                <strong>Kelurahan:</strong> {marker.kelurahan}<br />
                <strong>Koordinat:</strong> {marker.coordinate[0]} {marker.coordinate[1]}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <Legend />
      <FilterForm onFilter={handleFilter} kecamatanList={kecamatanList} kelurahanList={kelurahanList} style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }} />
    </div>
  );
};

export default MapComponent;
