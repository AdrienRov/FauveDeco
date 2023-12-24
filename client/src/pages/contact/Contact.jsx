import React, { useEffect, useRef, useState, useContext } from 'react';
import { Link} from "react-router-dom";
import axios from 'axios';

function Contact() {

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [alert, setAlert] = useState({ state: false, type: '', message: '' });


	const onSubmit = (e) => {
		const url = `http://localhost:8000/contact`;
		axios.post(url, {
			name: name,
			mail: email,
			message: message,
		})
			.then((response) => {
				setAlert({
					state: true,
					type: 'success',
					message: 'Mail envoyé !'
				});
				setTimeout(() => {
					<Link to="/contact"></Link>
					//supprimer le contenu des inputs
					setName('');
					setEmail('');
					setMessage('');
					setAlert({
						state: false,
						type: '',
						message: ''
					});
                }, 2000);
			})
			.catch((error) => {
				setAlert({
					state: true,
					type: 'error',
					message: 'Erreur lors de l\'envoi du mail'
				});
			});

		e.preventDefault();
	}

	return (
		<div className="container mx-auto">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="card">
					<div className="card-body">
						<h2 className="card-title">Nous contacter</h2>
						<div className="divider"></div>
						<form className="mt-6" onSubmit={onSubmit}>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Nom</span>
								</label>
								<input type="text" placeholder="Votre nom" className="input input-bordered" value={name} onChange={(e) => setName(e.target.value)} />
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Email</span>
								</label>
								<input type="text" placeholder="Votre email" className="input input-bordered" value={email} onChange={(e) => setEmail(e.target.value)} />
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Message</span>
								</label>
								<textarea className="textarea h-24 textarea-bordered" placeholder="Votre message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
							</div>
							<div className="text-center">
								<button className="btn btn-primary mt-4">Envoyer le message</button>
							</div>
							{alert.state && (
								<div role="alert" className={`alert ${alert.type === 'success' ? 'alert-success' : 'alert-error'}`}>
									<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={alert.type === 'success' ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"} />
									</svg>
									<span>{alert.message}</span>
								</div>
							)}
						</form>
					</div>
				</div>
				<div className="card">
					<div className="card-body">
						<h2 className="card-title">Informations</h2>
						<div className="divider"></div>
						<div className="mt-6 pt-2">
							<p><span className="font-bold">Adresse : </span> 1 rue de la paix, 76620 Le Havre</p>
							<p><span className="font-bold">Téléphone : </span> 01 23 45 67 89</p>
							<p><span className="font-bold">Email : </span> fauve-deco@gmail.com</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Contact;