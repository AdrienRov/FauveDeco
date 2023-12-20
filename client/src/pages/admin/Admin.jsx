import axios from 'axios';
import React, { useState } from 'react';
import NavBarAdmin from './NavBarAdmin';
import TableUsers from './TableUsers';
import TableOrders from './TableOrders';
import TableProducts from './TableProducts';
import TableCategories from './TableCategories';

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
			case 'products':
				setTable(<TableProducts />);
				break;
			case 'categories':
				setTable(<TableCategories />);
				break;
			case 'home':
				props.parentCallback("home");
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
