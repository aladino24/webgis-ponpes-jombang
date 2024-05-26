import React, { useState } from 'react';
import './FilterForm.css';

const FilterForm = (props) => {
  const { onFilter, kecamatanList, kelurahanList, style } = props;
  const [district, setDistrict] = useState('');
  const [kelurahan, setKelurahan] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ district, kelurahan, status });
  };

  return (
    <form onSubmit={handleSubmit} className="filter-form" style={style}>
      <label>
        Kecamatan:
        <select value={district} onChange={(e) => setDistrict(e.target.value)}>
          <option value="">Pilih Kecamatan</option>
          {kecamatanList.map((kecamatan, index) => (
            <option key={index} value={kecamatan}>{kecamatan}</option>
          ))}
        </select>
      </label>
      <label>
        Kelurahan:
        <select value={kelurahan} onChange={(e) => setKelurahan(e.target.value)}>
          <option value="">Pilih Kelurahan</option>
          {kelurahanList.map((kelurahan, index) => (
            <option key={index} value={kelurahan}>{kelurahan}</option>
          ))}
        </select>
      </label>
      <label>
        Status:
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Pilih Status</option>
          <option value="Aktif">Aktif</option>
          <option value="Tidak Aktif">Tidak Aktif</option>
        </select>
      </label>
      <button type="submit">Filter</button>
    </form>
  );
};

export default FilterForm;
