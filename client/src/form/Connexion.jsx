import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

function Connexion(props) {

	const [spinner, setSpinner] = useState(false);

	const handleCancel = () => {
		let visible = false;
		props.parentCallback(visible);
	}
	const handleSwitch = () => {
		props.handleSwitch();
	}

	const formSubmit = (e) => {
		e.preventDefault();
		let email = e.target.email.value;
		let password = e.target.password.value;
		setSpinner(true);

		axios.post('http://localhost:8000/login', {
			username: email,
			password: password
		}).then(async (response) => {
			console.log(response);
			if (response.status === 200) {
				let user = await axios.get('http://localhost:8000/user/self').catch((error) => {
					console.log(error);
					setSpinner(false);
				});
				if (!user) {
					return;
				}
				console.log(user);
				localStorage.setItem('user', JSON.stringify(user.data));
				window.location.href = '/user';
				
			}
		}).catch((error) => {
			console.log(error);
			setSpinner(false);
		})

	}

	if (spinner) {
		return (
			<LoadingSpinner />
		);
	}

	return (
		<div class="relative bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
			<button className="p-2 rounded-full hover:bg-gray-200 absolute top-0 right-0" onClick={handleCancel}>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
					<path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
				</svg>
			</button>
			<div class="flex justify-center mb-6">
				<span class="inline-block bg-gray-200 rounded-full p-3">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4" /></svg>
				</span>
			</div>
			<h2 class="text-2xl font-semibold text-center mb-4">Se connecter</h2>
			<p class="text-gray-600 text-center mb-6">Entrez votre Email pour vous connecter.</p>
			<form onSubmit={formSubmit}>
				<div class="mb-4">
					<label for="email" class="block text-gray-700 text-sm font-semibold mb-2">Adresse Email *</label>
					<input type="email" id="email" class="form-input w-full px-4 py-2 border rounded-lg text-gray-700" required placeholder="hello@alignui.com" />
				</div>
				<div class="mb-6">
					<label for="password" class="block text-gray-700 text-sm font-semibold mb-2">Mot de passe *</label>
					<input type="password" id="password" class="form-input w-full px-4 py-2 border rounded-lg text-gray-700" required placeholder="••••••••" />
				</div>
				<button type="submit" class="w-full text-white px-4 py-2 rounded-lg focus:outline-none">Se connecter</button>
				<button class="w-full px-4 py-2 rounded-lg focus:outline-none text-sm underline" onClick={handleSwitch}>Pas de compte</button>
			</form>
		</div>
	);
}

export default Connexion;