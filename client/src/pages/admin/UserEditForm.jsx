import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function UserEditForm(props) {
    const [editedUser, setEditedUser] = useState({});
    const [loading, setLoading] = useState(true);
    const { user } = props;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setEditedUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (!user) {
            return;
        }

        axios.get(`http://localhost:8000/user/${user}`).then((response) => {
            setEditedUser(response.data);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        });
    }, [user]);

    const roles = {
        0: 'Annonyme',
        1: 'Utilisateur',
        2: 'Administrateur'
    }

    const onTrigger = (event) => {
       

        const url = `http://127.0.0.1:8000/user/${user}`;

        axios.patch(url, {
            firstName: editedUser.firstName,
            lastName: editedUser.lastName,
            email: editedUser.email,
            role: editedUser.role,
            phone: editedUser.phone,
            address: editedUser.address,
            country: editedUser.country
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
            {loading ? (
                <p>Chargement en cours...</p>
            ) : (
                <div className="bg-white p-6 shadow-md rounded-md">
                    <h2 className="text-2xl font-semibold mb-4">
                        Modifier un utilisateur
                    </h2>

                    {/* Formulaire d'édition */}
                    <form>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Prénom :</label>
                            <input
                                type="text"
                                name="firstName"
                                value={editedUser.firstName || ''}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Nom :</label>
                            <input
                                type="text"
                                name="lastName"
                                value={editedUser.lastName || ''}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Adresse e-mail :</label>
                            <input
                                type="email"
                                name="email"
                                value={editedUser.email || ''}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Rôle :</label>
                            <select
                                name="role"
                                value={editedUser.role}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            >
                                {Object.keys(roles).map((key) => (
                                    <option key={key} value={key}>
                                        {roles[key]}
                                    </option>
                                ))}
                            </select>

                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Téléphone :</label>
                            <input
                                type="text"
                                name="phone"
                                value={editedUser.phone || ''}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Adresse :</label>
                            <textarea
                                name="address"
                                value={editedUser.address || ''}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Pays :</label>
                            <input
                                type="text"
                                name="country"
                                value={editedUser.country || ''}
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

export default UserEditForm;
