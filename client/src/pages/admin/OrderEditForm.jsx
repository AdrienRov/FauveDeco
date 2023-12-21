import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function OrderEditForm(props) {
    const [editedOrder, setEditedOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const { order } = props;

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Si le champ appartient directement à la commande
        if (name !== 'phone' && name !== 'email' && name !== 'address' && name !== 'country') {
            setEditedOrder((prevOrder) => ({
                ...prevOrder,
                [name]: value,
            }));
        } else {
            // Si le champ appartient au client
            setEditedOrder((prevOrder) => ({
                ...prevOrder,
                client: {
                    ...prevOrder.client,
                    [name]: value,
                },
            }));
        }
    };

    useEffect(() => {
        if (!order) {
            return; 
        }
        axios.get(`http://localhost:8000/order/${order}`).then((response) => {
            setEditedOrder(response.data);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        });
        


    }, [order]);

    const onTrigger = (event) => {
        const url = `http://localhost:8000/order/${order}`; // Assurez-vous d'avoir l'ID de la commande ici
        console.log(editedOrder);
        axios.patch(url, {
            status: editedOrder.status,
        })
            .then((response) => {
                console.log('Mise à jour réussie !', response.data);
                window.location.reload();
            })
            .catch((error) => {
                console.error('Erreur lors de la mise à jour', error);
            });
    
        event.preventDefault();
    };

    const status = {
		0: "En attente",
        1: "Attente de paiement",
		2: "En préparation",
		3: "Prêt",
		4: "Terminé",
		5: "Annulé"
	};
    

    return (
        <>
            {loading ? (
                <p>Chargement en cours...</p>
            ) : (
                <div className="bg-white p-6 shadow-md rounded-md">
                    <h2 className="text-2xl font-semibold mb-4">
                        Modifier une commande
                    </h2>

                    {/* Card avec les infos de la commande */}
                    <div className="bg-gray-100 p-4 rounded-md mb-4">
                        <div className="flex justify-between mb-2">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold">
                                    Commande #{editedOrder.id}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {editedOrder.date}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {editedOrder.client.address}, {editedOrder.client.country}
                                </p>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold">
                                    {editedOrder.client.firstName}{' '}
                                    {editedOrder.client.lastName}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {editedOrder.client.email}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {editedOrder.client.phone}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Formulaire d'édition */}
                    <form>

                        {/* Select pour le status */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Status :</label>
                            <select
                                name="status"
                                value={editedOrder.status}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            >
                                {Object.keys(status).map((key) => (
                                    <option key={key} value={key}>
                                        {status[key]}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="button"
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
                            onClick={onTrigger}
                        >
                            Enregistrer les modifications
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}

export default OrderEditForm;
