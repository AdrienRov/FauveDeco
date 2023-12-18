import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInfoField from './UserInfoField';
import OrderField from './OrderField';

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
    <div className="container mx-auto my-8 p-4 px-10 bg-white shadow-lg rounded-lg">
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
      {user.orders?.map(order => (
        <OrderField order={order} />
      ))}
    </div>
  );
};

export default User;
