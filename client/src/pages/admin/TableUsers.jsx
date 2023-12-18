import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';

function TableUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/users')
            .then((response) => {
                console.log(response.data);
                setUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <>
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
        </>

    )
}

export default TableUsers;