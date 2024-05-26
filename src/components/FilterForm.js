import React, { useState } from 'react';
import './FilterForm.css';

const FilterForm = ({ onFilter, kecamatanList, kelurahanList, style }) => {
  const [kecamatan, setKecamatan] = useState('');
  const [kelurahan, setKelurahan] = useState('');
  const [status, setStatus] = useState('');

  const handleFilterChange = (field, value) => {
    if (field === 'kecamatan') {
      setKecamatan(value);
    } else if (field === 'kelurahan') {
      setKelurahan(value);
    } else if (field === 'status') {
      setStatus(value);
    }

    const newFilters = {
      kecamatan: field === 'kecamatan' ? value : kecamatan,
      kelurahan: field === 'kelurahan' ? value : kelurahan,
      status: field === 'status' ? value : status,
    };

    onFilter(newFilters);
  };

  return (
    <form className="filter-form" style={style}>
      <label>
        Kecamatan:
        <select value={kecamatan} onChange={(e) => handleFilterChange('kecamatan', e.target.value)}>
          <option value="">Pilih Semua</option>
          {kecamatanList.sort((a, b) => a.localeCompare(b)).map((kecamatan, index) => (
            <option key={index} value={kecamatan}>{kecamatan}</option>
          ))}
        </select>
      </label>
      <label>
        Kelurahan:
        <select value={kelurahan} onChange={(e) => handleFilterChange('kelurahan', e.target.value)}>
          <option value="">Pilih Semua</option>
          {kelurahanList.sort((a, b) => a.localeCompare(b)).map((kelurahan, index) => (
            <option key={index} value={kelurahan}>{kelurahan}</option>
          ))}
        </select>
      </label>
      {/* <label>
        Status:
        <select value={status} onChange={(e) => handleFilterChange('status', e.target.value)}>
          <option value="">Pilih Status</option>
          <option value="Aktif">Aktif</option>
          <option value="Tidak Aktif">Tidak Aktif</option>
        </select>
      </label> */}
    </form>
  );
};

export default FilterForm;
