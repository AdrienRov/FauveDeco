import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import NavBarAdmin from './NavBarAdmin';
import TableUsers from './TableUsers';

function Admin(props) {
    const [table, setTable] = useState(<TableUsers />);
    
    const handleCallback = (data) => {
        switch (data) {
            case "user":
                setTable(<TableUsers />);
                break;
        }
    };
    return (
        <>
            <NavBarAdmin parentCallback={handleCallback}  />
            {table}
        </>

    )
}

export default Admin;