import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function OrderSendInvoice(props) {
    const { order } = props;

    const onTrigger = (event) => {
        const url = `http://localhost:8000/send-invoice/${order.id}`; // Assurez-vous d'avoir l'ID de la commande ici
        axios.post(url, {
            url: event.target.url.value,
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

    

    return (
        <>

            <div className="bg-white p-6 shadow-md rounded-md">
                <h2 className="text-2xl font-semibold mb-4">
                    Envoyer une facture
                </h2>

                {/* Card avec les infos de la commande */}
                <div className="bg-gray-100 p-4 rounded-md mb-4">
                    <div className="flex justify-between mb-2">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold">
                                Commande #{order.id}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {order.date}
                            </p>
                            <p className="text-sm text-gray-600">
                                {order.client.address}, {order.client.country}
                            </p>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold">
                                {order.client.firstName}{' '}
                                {order.client.lastName}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {order.client.email}
                            </p>
                            <p className="text-sm text-gray-600">
                                {order.client.phone}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Formulaire d'édition */}
                <form onSubmit={onTrigger}>

                    {/* Select pour le status */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Text :</label>
                        <input
                            type="text"
                            name="url"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                        
                    </div>

                    <input
                        type="submit"
                        value="Envoyer"
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
                    />
                </form>
            </div>
        
        </>
    );
}

export default OrderSendInvoice;
