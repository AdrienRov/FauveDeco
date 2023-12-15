import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInfoField from './UserInfoField';

const User = () => {
  const urlUser = "http://127.0.0.1:8000/user/38";
  const id = 38;
  const [ user , setUser ] = useState([]);

  useEffect(() => {
    if (!id) {
        return;
    }
    axios.get(`${urlUser}?category=${id}`).then(response => {
        setUser(response.data);
        console.log(response.data);
    });
}, [id]);

  // Vérifier si user n'est pas vide
  if (!user) {
    return <div className="container mx-auto my-8 p-4 bg-white shadow-lg rounded-lg">Chargement...</div>;
  }

  return (
    <div className="container mx-auto my-8 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Informations de l'utilisateur</h2>

      <div className="flex justify-between items-center mb-4">
        <UserInfoField label="Nom" value={user.firstName} />
        <UserInfoField label="Prénom" value={user.lastName} />
      </div>
      <div className="flex justify-between items-center mb-4">
        <UserInfoField label="Email" value={user.email} />
        <UserInfoField label="Téléphone" value={user.phone} />
      </div>
      <div className="flex justify-between items-center mb-4">
        <UserInfoField label="Adresse" value={user.address} />
        <UserInfoField label="Pays" value={user.country} />
      </div>

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
        {user.orders?.map(order => (
            <tr key={order.id}>
              <td className="py-2 px-4 border">{order.id}</td>
              <td className="py-2 px-4 border">{order.date}</td>
              <td className="py-2 px-4 border">{order.total}</td>
              <td className="py-2 px-4 border">{order.type}</td>
              <td className="py-2 px-4 border">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table> 
    </div>
  );
};

export default User;
