import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, Polygon } from 'react-leaflet';
import L from 'leaflet';
import Legend from './Legend';
import './MapComponent.css';
import FilterForm from './FilterForm';
import PesantrenJombang from '../geojson/pesantren_jombang.geojson';
import KabupatenJombang from '../geojson/KABUPATEN_JOMBANG.geojson';
import JombangKecamatan from '../geojson/jombang_kecamatan.geojson';
import ToggleLayerKecamatan from './ToggleLayerKecamatan';
import ToggleLayer from './ToggleLayer';
import MataAngin from '../assets/mata-angin.png';

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
  const [jombangKecamatanData, setJombangKecamatanData] = useState(null);
  const [kecamatanList, setKecamatanList] = useState([]);
  const [kelurahanList, setKelurahanList] = useState([]);
  const [kecamatanColors, setKecamatanColors] = useState({});
  const [isCheckedKecamatan, setIsCheckedKecamatan] = useState(false);
  const [isCheckedKabupaten, setIsCheckedKabupaten] = useState(false); // New state for Kabupaten Jombang layer

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
        setKecamatanList(Array.from(kecamatanSet).sort((a, b) => a.localeCompare(b)));
        setKelurahanList(Array.from(kelurahanSet).sort((a, b) => a.localeCompare(b)));
      });

    fetch(KabupatenJombang)
      .then(response => response.json())
      .then(data => {
        setGeojsonData(data);
      });

    fetch(JombangKecamatan)
      .then(response => response.json())
      .then(data => {
        const newPolygons = data.features.map(feature => {
          const coordinates = feature.geometry.coordinates[0]; // Pastikan koordinat berada di dalam indeks yang benar
          return {
            positions: coordinates.map(coord => [coord[1], coord[0]]), // Pastikan koordinat diambil dengan urutan yang benar
            kecamatan: feature.properties.KECAMATAN
          };
        });

        // Generate random colors for each kecamatan
        const colors = {};
        newPolygons.forEach(polygon => {
          const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
          colors[polygon.kecamatan] = randomColor;
        });

        setKecamatanColors(colors);
        setJombangKecamatanData(newPolygons);
      });
  }, []);

  useEffect(() => {
    setFilteredMarkers(markers);
  }, [markers]);

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

  const handleToggleLayerKecamatan = () => {
    setIsCheckedKecamatan(!isCheckedKecamatan); 
  };

  const handleToggleLayerKabupaten = () => {
    setIsCheckedKabupaten(!isCheckedKabupaten); 
  };

  return (
    <div className="map-container">
      <MapContainer center={[-7.5492, 112.2333]} zoom={11} style={{ height: "100vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {isCheckedKabupaten && geojsonData && <GeoJSON data={geojsonData} style={() => ({
          color: 'brown',
          weight: 2,
          opacity: 0.8,
        })} />}

        {isCheckedKecamatan && jombangKecamatanData && jombangKecamatanData.map((feature, index) => (
          <Polygon key={index} positions={feature.positions} pathOptions={{ color: kecamatanColors[feature.kecamatan], fillColor: kecamatanColors[feature.kecamatan], fillOpacity: 0.6 }} >
            <Popup>{feature.kecamatan}</Popup>
          </Polygon>
        ))}

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
      <img src={MataAngin} alt="Mata Angin" className="mata-angin" />
      <ToggleLayerKecamatan label="Show Kecamatan" isChecked={isCheckedKecamatan} onToggle={handleToggleLayerKecamatan} />
      <ToggleLayer label="Show Kabupaten" isChecked={isCheckedKabupaten} onToggle={handleToggleLayerKabupaten} />
      <FilterForm onFilter={handleFilter} kecamatanList={kecamatanList} kelurahanList={kelurahanList} style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }} />
     
    </div>
  );
};

export default MapComponent;
