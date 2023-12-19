import axios from 'axios';
import React, { useEffect, useState } from 'react';

function TableUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/users')
            .then((response) => {
                setUsers(response.data);
                setLoading(false); // Mettre le chargement à false une fois les données chargées
            })
            .catch((error) => {
                console.log(error);
                setLoading(false); // Mettre le chargement à false en cas d'erreur
            });
    }, []);

    return (
        <>
            {loading ? (
                <p>Chargement en cours...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead className="bg-accent-content text-white">
                            <tr>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Téléphone</th>
                                <th>Email</th>
                                <th>Adresse</th>
                                <th>Pays</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, i) => (
                                <tr key={i}>
                                    <td>{user.lastName}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address}</td>
                                    <td>{user.country}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}

export default TableUsers;
