import React, { useEffect, useState, useContext } from 'react';

function Connexion(props) {
	const handleCancel = () => {
		props.parentCallback(false);
	}

	return (

		<div class="bg-gray-100 flex items-center justify-center p-4">
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
				<form>
					<div class="mb-4">
						<label for="email" class="block text-gray-700 text-sm font-semibold mb-2">Adresse Email *</label>
						<input type="email" id="email" class="form-input w-full px-4 py-2 border rounded-lg text-gray-700" required placeholder="hello@alignui.com" />
					</div>
					<div class="mb-6">
						<label for="password" class="block text-gray-700 text-sm font-semibold mb-2">Mot de passe *</label>
						<input type="password" id="password" class="form-input w-full px-4 py-2 border rounded-lg text-gray-700" required placeholder="••••••••" />
					</div>
					<button type="submit" class="w-full text-white px-4 py-2 rounded-lg focus:outline-none">Se connecter</button>
				</form>
			</div>
		</div>
	);
}

export default Connexion;