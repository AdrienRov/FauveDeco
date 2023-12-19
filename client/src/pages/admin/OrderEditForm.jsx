import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrderEditForm(props) {
    const [editedOrder, setEditedOrder] = useState({});
    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const { order } = props;

    const handleEditOrder = async () => {
        // Logique pour éditer la commande
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Mettre à jour les champs du formulaire lorsqu'ils changent
        setEditedOrder((prevOrder) => ({
            ...prevOrder,
            [name]: value,
        }));
    };

    const handleClientSearch = (query) => {
        const filtered = clients.filter((client) =>
            `${client.lastName} ${client.firstName}`.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredClients(filtered);
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/order/${order}`);
                setEditedOrder(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchClients = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/users`);
                setClients(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchClients();
        fetchOrders();
    }, []);

    return (
        <>
            {loading ? (
                <p>Chargement en cours...</p>
            ) : (
                <div className="bg-white p-6 shadow-md rounded-md">
                    <h2 className="text-2xl font-semibold mb-4">
                    </h2>

                    {/* Barre de recherche pour les clients */}
                    <input
                        type="text"
                        placeholder="Rechercher un client"
                        onChange={(e) => handleClientSearch(e.target.value)}
                        className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                    />

                    {/* Liste des clients filtrés */}
                    <ul>
                        {filteredClients.map((client) => (
                            <li key={client.id} onClick={() => setSelectedClient(client)}>
                                {client.lastName} {client.firstName}
                            </li>
                        ))}
                    </ul>

                    {/* Formulaire d'édition */}
                    <form>
                        {/* Autres champs du formulaire */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Nouveau Nom :</label>
                            <input
                                type="text"
                                name="newLastName"
                                value={editedOrder.newLastName || ''}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Nouveau Prénom :</label>
                            <input
                                type="text"
                                name="newFirstName"
                                value={editedOrder.newFirstName || ''}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>

                        <button
                            type="button"
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
                            onClick={handleEditOrder}
                        >
                            Enregistrer les modifications
                        </button>

                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded mt-2 hover:bg-gray-600"
                        >
                            Annuler l'édition
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}

export default OrderEditForm;
