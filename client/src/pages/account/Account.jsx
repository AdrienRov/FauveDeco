import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInfoField from './UserInfoField'; // Importez le composant UserInfoField

const Account = () => {
  const [account, setAccount] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    // Faites un appel à votre API Symfony pour récupérer les informations de base de l'utilisateur
    axios.get('/api/user/info')
      .then(response => {
        setAccount(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des informations de base de l\'utilisateur:', error);
      });

    // Faites un deuxième appel à votre API Symfony pour récupérer l'historique des commandes
    axios.get('/api/order/history')
      .then(response => {
        setOrderHistory(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération de l\'historique des commandes:', error);
      });
  }, []);

  return (
    <div className="container mx-auto my-8 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Informations de l'utilisateur</h2>

      <UserInfoField label="Nom" value={account.nom} />
      <UserInfoField label="Prénom" value={account.prenom} />
      <UserInfoField label="Email" value={account.email} />
      <UserInfoField label="Téléphone" value={account.telephone} />
      <UserInfoField label="Adresse" value={account.adresse} />
      <UserInfoField label="Pays" value={account.pays} />

      {/* Historique des commandes */}
      <h2 className="text-2xl font-bold my-4">Historique des commandes</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Numéro de commande</th>
            <th className="py-2 px-4 border">Date</th>
            <th className="py-2 px-4 border">Montant total</th>
            <th className="py-2 px-4 border">Type</th>
            <th className="py-2 px-4 border">Statut</th>
          </tr>
        </thead>
        <tbody>
          {orderHistory.map(order => (
            <tr key={order.id}>
              <td className="py-2 px-4 border">{order.orderNumber}</td>
              <td className="py-2 px-4 border">{order.date}</td>
              <td className="py-2 px-4 border">{order.totalAmount}</td>
              <td className="py-2 px-4 border">{order.type}</td>
              <td className="py-2 px-4 border">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Account;
