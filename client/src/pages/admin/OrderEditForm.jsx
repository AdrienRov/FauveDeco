import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function OrderEditForm(props) {
    const [editedOrder, setEditedOrder] = useState({});
    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
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


    const handleClientSelect = (selectedOption) => {
        setSelectedClient(selectedOption);
    };

    const handleClientSearch = (query) => {
        const filtered = clients.filter((client) =>
            `${client.lastName} ${client.firstName}`.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredClients(filtered);
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const orderResponse = await axios.get(`http://127.0.0.1:8000/order/${order}`);
                const clientsResponse = await axios.get(`http://127.0.0.1:8000/users`);
                setEditedOrder(orderResponse.data);
                setClients(clientsResponse.data);
                setSelectedClient(orderResponse.data.client);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [order]);

    const onTrigger = (event) => {
        const formData = new FormData();
        formData.append('date', editedOrder.date);
    
        const url = `http://127.0.0.1:8000/order/${order}`; // Assurez-vous d'avoir l'ID de la commande ici
    
        axios.patch(url, formData)
            .then((response) => {
                console.log('Mise à jour réussie !', response.data);
            })
            .catch((error) => {
                console.error('Erreur lors de la mise à jour', error);
            });
    
        event.preventDefault();
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

                    {/* Formulaire d'édition */}
                    <form>
                        {/* Barre de recherche pour les clients */}
                        <Select
                            value={selectedClient ? { value: selectedClient, label: `${selectedClient.lastName} ${selectedClient.firstName}` } : null}
                            options={filteredClients.map((client) => ({
                                value: client,
                                label: `${client.lastName} ${client.firstName}`,
                            }))}
                            onInputChange={(value) => handleClientSearch(value)}
                            onChange={(selectedOption) => handleClientSelect(selectedOption.value)}
                            placeholder="Rechercher un client"
                        />

                        {/* Ajoutez des champs pour le téléphone, l'e-mail, l'adresse, le pays et la date */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Téléphone :</label>
                            <input
                                type="text"
                                name="phone"
                                value={editedOrder.client.phone || ''}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">E-mail :</label>
                            <input
                                type="email"
                                name="email"
                                value={editedOrder.client.email || ''}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Adresse :</label>
                            <textarea
                                name="address"
                                value={editedOrder.client.address || ''}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Pays :</label>
                            <input
                                type="text"
                                name="country"
                                value={editedOrder.client.country || ''}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Date :</label>
                            <input
                                type="date"
                                name="date"
                                value={formatDate(new Date(editedOrder.date))}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
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
