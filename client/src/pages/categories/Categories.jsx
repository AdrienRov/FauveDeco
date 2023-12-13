import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function Categories(props) {

    let { id } = useParams();
    let { categories } = props;

    id = parseInt(id);

    let category = null;
    if (id) {
        category = categories.find(category => category.id == id);
    }

    if (!category) {
        return (<>
            {
                categories?.map(category => (<>
                    <Link key={category.id} to={`/categories/${category.id}`} className="border-b-2 border-gray-300 hover:border-gray-400">
                    <div key={category.id} className="p-4">
                        <h1 className="text-3xl font-bold">{category.name}</h1>
                        <p className="text-lg">{category.description}</p>
                    </div>
                    </Link>
                    </>))
            }
        </>);
    }

    return (
        <h1 className="text-3xl font-bold text-center">{category.name}</h1>
    );
}

export default Categories;