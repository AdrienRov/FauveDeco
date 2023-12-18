import axios from 'axios';
import React, { useState } from 'react';
import NavBarAdmin from './NavBarAdmin';
import TableUsers from './TableUsers';
import TableOrders from './TableOrders';

function Admin(props) {
  const [table, setTable] = useState(<TableUsers />);

  const handleCallback = (data) => {
    switch (data) {
      case 'user':
        setTable(<TableUsers />);
        break;
      case 'orders':
        setTable(<TableOrders />);
        break;
      // Add cases for other tabs if needed
      default:
        // Handle default case
        break;
    }
  };

  return (
    <>
      <NavBarAdmin parentCallback={handleCallback} />
      {table}
    </>
  );
}

export default Admin;
