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
        const fetchData = async () => {
            try {
                const userResponse = await axios.get(`http://127.0.0.1:8000/user/${user}`);
                setEditedUser(userResponse.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [user]);

    const onTrigger = (event) => {
        const formData = new FormData();
        formData.append('firstName', editedUser.firstName);
        formData.append('lastName', editedUser.lastName);
        formData.append('email', editedUser.email);
        formData.append('role', editedUser.role);
        formData.append('phone', editedUser.phone);
        formData.append('address', editedUser.address);
        formData.append('country', editedUser.country);

        const url = `http://127.0.0.1:8000/user/${user}`;

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
                            <input
                                type="text"
                                name="role"
                                value={editedUser.role || ''}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
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
