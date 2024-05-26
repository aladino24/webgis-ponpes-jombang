// src/FilterForm.js
import React, { useState } from 'react';
import './FilterForm.css';

const FilterForm = (props) => {
  const { onFilter, style } = props;
  const [district, setDistrict] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ district, category, status });
  };

  return (
    <form onSubmit={handleSubmit} className="filter-form" style={style}>
      <label>
        Kecamatan:
        <select value={district} onChange={(e) => setDistrict(e.target.value)}>
          <option value="">Pilih Kecamatan</option>
          <option value="Kecamatan1">Kecamatan1</option>
          <option value="Kecamatan2">Kecamatan2</option>
        </select>
      </label>
      <label>
        Kategori:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Pilih Kategori</option>
          <option value="Kategori1">Kategori1</option>
          <option value="Kategori2">Kategori2</option>
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
    </form>
  );
};

export default FilterForm;
