import React from 'react';

function Produit() {
    // Exemple de données statiques
    const produits = [
        {
            _id: 1,
            nom: 'Produit 1',
            description: 'Description du produit 1',
            prix: 19.99,
            image: 'https://www.drageesanahita.com/21233-thickbox_default/bougie-colombe-blanche.jpg',
        },
        {
            _id: 2,
            nom: 'Produit 2',
            description: 'Description du produit 2',
            prix: 29.99,
            image: 'https://www.dekodacc.fr/wp-content/uploads/2020/06/bougie-tiare-2.png',
        },
        // Ajoutez d'autres produits si nécessaire
    ];

    return (
        <div className="container">
            <div className="row">
                {produits.map((produit) => (
                    <div className="col-md-6 mb-4" key={produit._id}>
                        <div className="card">
                            <div className="row no-gutters">
                                <div className="col-md-6">
                                    <img
                                        src={produit.image}
                                        className="card-img"
                                        alt={produit.nom}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {produit.nom}
                                        </h5>
                                        <p className="card-text">
                                            {produit.description}
                                        </p>
                                        <p className="card-text">{produit.prix}€</p>
                                        <a
                                            href="#"
                                            className="btn btn-primary"
                                        >
                                            Ajouter au panier
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Produit;