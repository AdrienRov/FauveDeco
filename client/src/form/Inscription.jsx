import React, { useEffect, useState, useContext } from 'react';

function Inscription(props) {
	const handleCancel = () => {
		let visible = false;
		props.parentCallback(visible);
	}
	const handleSwitch = () => {
		props.handleSwitch();
	}
	return (
		<div class="relative bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
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
			<h2 class="text-2xl font-semibold text-center mb-4">Créer un nouveau compte</h2>
			<p class="text-gray-600 text-center mb-6">Entrez vos informations pour vous inscrire.</p>
			<form>
				<div class="mb-4">
					<label for="fullName" class="block text-gray-700 text-sm font-semibold mb-2">Nom entier *</label>
					<input type="text" id="fullName" className="form-input w-full px-4 py-2 border rounded-lg text-gray-700" required placeholder="James Brown" />
				</div>
				<div class="mb-4">
					<label for="email" class="block text-gray-700 text-sm font-semibold mb-2">Adresse Email *</label>
					<input type="email" id="email" class="form-input w-full px-4 py-2 border rounded-lg text-gray-700" required placeholder="hello@alignui.com" />
				</div>
				<div class="mb-6">
					<label for="password" class="block text-gray-700 text-sm font-semibold mb-2">Mot de passe *</label>
					<input type="password" id="password" class="form-input w-full px-4 py-2 border rounded-lg text-gray-700" required placeholder="••••••••" />
					<p class="text-gray-600 text-xs mt-1">Doit contenir 1 lettre majuscule, 1 chiffre, minimum. 8 caractères.</p>
				</div>
				<button type="submit" class="w-full bg-pink-500 text-white px-4 py-2 rounded-lg">S'inscrire</button>
				<p class="text-gray-600 text-xs text-center mt-4">
					En cliquant sur S'inscrire, vous acceptez les conditions de Fauve Décoration.
					<a href="#" class="text-blue-500 hover:underline"> Termes et Conditions</a>.
				</p>
			</form>
			<button class="w-full px-4 py-2 rounded-lg focus:outline-none text-sm underline" onClick={handleSwitch}>Vous avez déjà un compte</button>
		</div>
	);
}

export default Inscription;