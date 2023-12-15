import * as React from 'react';

function Contact() {
	return (
		<div className="container mx-auto">
			<div className="grid grid-cols-2 gap-4">
				<div className="card">
					<div className="card-body">
						<h2 className="card-title">Nous contacter</h2>
						<div className="divider"></div>
						<form className="mt-6">
							<div className="form-control">
								<label className="label">
									<span className="label-text">Nom</span>
								</label>
								<input type="text" placeholder="Votre nom" className="input input-bordered" />
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Email</span>
								</label>
								<input type="text" placeholder="Votre email" className="input input-bordered" />
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Message</span>
								</label>
								<textarea className="textarea h-24 textarea-bordered" placeholder="Votre message"></textarea>
							</div>
							<div className="text-center">
								<button className="btn btn-primary mt-4">Envoyer le message</button>
							</div>
						</form>
					</div>
				</div>
				<div className="card">
					<div className="card-body">
						<h2 className="card-title">Informations</h2>
						<div className="divider"></div>
						<div className="mt-6 pt-2">
							<p><span className="font-bold">Adresse : </span> 1 rue de la paix, 75000 Paris</p>
							<p><span className="font-bold">Téléphone : </span> 01 23 45 67 89</p>
							<p><span className="font-bold">Email : </span>/</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Contact;