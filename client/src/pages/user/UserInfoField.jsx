// UserInfoField.jsx
import React, { useState } from 'react';
import { useEffect } from 'react';

const UserInfoField = (porps) => {
  
  const [value, setValue] = useState(porps.value);

  useEffect(() => {
    setValue(porps.value);
  }, [porps.value]);

  return (<div className="mb-4 flex-1">
      <label className="block text-gray-700 text-sm font-bold mb-2">{porps.label}</label>
      <input
        type="text"
        name={porps.label.toLowerCase()}
        className="w-full px-3 py-2 border rounded-md"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoComplete="off"
      />
    </div>
  )
};

export default UserInfoField;
