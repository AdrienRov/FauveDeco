// UserInfoField.jsx
import React from 'react';

const UserInfoField = ({ label, value }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
    <input
      type="text"
      name={label.toLowerCase()} // Utilisez le label en minuscules comme nom
      className="w-full px-3 py-2 border rounded-md"
      disabled="disabled"
      value={value}
      autoComplete="off"
    />
  </div>
);

export default UserInfoField;
