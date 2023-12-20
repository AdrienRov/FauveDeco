import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'react-daisyui';

const NavBarAdmin = (props) => {
	const [activeTab, setActiveTab] = useState('user');

	const handleChangeTable = (data) => {
		props.parentCallback(data);
		setActiveTab(data);
	};

	const handleHome = () => {
		props.parentCallback("home");
	}

	return (
		<div className="navbar p-4">
			<div className="navbar-start divider divider-white text-white font-bold text-xl">Administration</div>
			<Link to="/" onClick={handleHome} className="navbar-center hidden lg:flex mx-5 mb-0">
				<p className="text-4xl text-white">fauve</p>
				<p className="text-white">DECORATION</p>
			</Link>
			<div className="navbar-end divider divider-white">
				<ul className="flex space-x-4">
					<Button
						color=""
						size="sm"
						className={`mr-2 btn-adm ${activeTab === 'user' ? 'underline' : ''}`}
						onClick={() => handleChangeTable('user')}
					>
						Utilisateurs
					</Button>
					<Button
						color=""
						size="sm"
						className={`mr-2 btn-adm ${activeTab === 'orders' ? 'underline' : ''}`}
						onClick={() => handleChangeTable('orders')}
					>
						Commandes
					</Button>
					<Button
						color=""
						size="sm"
						className={`mr-2 btn-adm ${activeTab === 'products' ? 'underline' : ''}`}
						onClick={() => handleChangeTable('products')}
					>
						Produits
					</Button>
					<Button
						color=""
						size="sm"
						className={`mr-2 btn-adm ${activeTab === 'categories' ? 'underline' : ''}`}
						onClick={() => handleChangeTable('categories')}
					>
						Catégories
					</Button>
				</ul>
			</div>
		</div>
	);
};

export default NavBarAdmin;
