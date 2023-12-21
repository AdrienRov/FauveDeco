import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInfoField from './UserInfoField';
import OrderField from './OrderField';

const User = () => {
  const urlUser = "http://localhost:8000/user/self";
  const [ user , setUser ] = useState([]);

  useEffect(() => {
    axios.get(urlUser).then(response => {
        setUser(response.data);
    }).catch((error) => {
        localStorage.removeItem('user');
        window.location.href = '/';
    });
  }, []);

  const formSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.nom.value);
    axios.patch(`http://localhost:8000/user/${user.id}`, {
      firstName: e.target["nom"].value,
      lastName: e.target["prénom"].value,
      email: e.target["email"].value,
      phone: e.target["téléphone"].value,
      address: e.target["adresse"].value,
      country: e.target["pays"].value
    }).then((response) => {
      console.log('Mise à jour réussie !', response.data);
      window.location.reload();
    })
  }

  // Vérifier si user n'est pas vide
  if (!user) {
    return <div className="container mx-auto my-8 p-4 bg-white shadow-lg rounded-lg">Chargement...</div>;
  }

  return (
    <div className="container mx-auto my-8 p-4 px-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Informations de l'utilisateur</h2>
      <form className="mb-4" onSubmit={formSubmit}>
        <div className="flex justify-between items-center mb-4 gap-5">
          <UserInfoField label="Nom" value={user.firstName} />
          <UserInfoField label="Prénom" value={user.lastName} />
        </div>
        <div className="flex justify-between items-center mb-4 gap-5">
          <UserInfoField label="Email" value={user.email} />
          <UserInfoField label="Téléphone" value={user.phone} />
        </div>
        <div className="flex justify-between items-center mb-4 gap-5">
          <UserInfoField label="Adresse" value={user.address} />
          <UserInfoField label="Pays" value={user.country} />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Modifier
        </button>
      </form>

      <h2 className="text-2xl font-bold my-4">Historique des commandes</h2>
      {user.orders?.map(order => (
        <OrderField order={order} />
      ))}
    </div>
  );
};

export default User;
