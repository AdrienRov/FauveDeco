import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const getParents = (categories, category) => {
    let parents = [];
    let parent_category = categories.find(c => c.id == category.parent);

    while (parent_category) {
        if (parents.find(p => p.id == parent_category.id)) {
            break;
        }
        parents.push(parent_category);
        parent_category = categories.find(c => c.id == parent_category.parent);
    }

    return parents;
}

function Categories(props) {

    let { id } = useParams();
    let { categories } = props;

    id = parseInt(id);

    let category = null;
    if (id) {
        category = categories.find(category => category.id == id);
    }

    const url = "http://127.0.0.1:8000/products";
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`${url}?category=${id}`).then(response => {
            setProducts(response.data);
        });
    }, [id]);

    // set category with parent as child of parent
    categories.forEach(c => {
        c.children = categories.filter(child => child.parent == c.id);
        });
    if (!category) {
        let sub_categories = (c) => {
            if (c.children) {
                return (<ul className="ml-4">
                    {
                        c.children.map(child => (<li key={child.id}>
                            <Link to={`/categories/${child.id}`} className="text-blue-600 hover:text-blue-800">{child.name}</Link>
                            {sub_categories(child)}
                        </li>))
                    }
                </ul>);

            }
        }
        return (<>
            <h1 className="text-2xl font-bold">Categories</h1>
            <ul className='ps-4'>
                {
                    categories.filter(c => !c.parent).map(category => (<li key={category.id}>
                        <Link to={`/categories/${category.id}`} className="text-blue-600 hover:text-blue-800">{category.name}</Link>
                        {sub_categories(category)}
                    </li>))
                }
            </ul>
        </>);
    }

    let parents = getParents(categories, category);
    
    return (<>
        {
        parents.reverse().map(parent => (<>
            <Link key={parent.id} to={`/categories/${parent.id}`} className="text-blue-600 hover:text-blue-800">{parent.name}</Link>
            <span className="mx-2">/</span>
            </>))
        }
        <span className="text-2xl font-bold">{category.name}</span>
        {
            // child categories as card
        }
        <h2 className="text-xl font-bold mt-4">Subcategories</h2>
        <div className="grid grid-cols-3 gap-4">
            {
                category.children.map(child => (<div key={child.id} className="bg-white rounded-lg shadow-lg p-4">
                    <Link to={`/categories/${child.id}`} className="text-blue-600 hover:text-blue-800">{child.name}</Link>
                </div>))
            }
        </div>
        <h2 className="text-xl font-bold mt-4">Products</h2>
        <div class="flex flex-wrap justify-center mt-10">
            {
                products.map(product => (
                    // card with image, name, price, description
                    <div key={product.id} class="max-w-sm rounded overflow-hidden shadow-lg m-4">
                        <img class="w-full" src={product.images[0]} alt={product.name} />
                        <div class="px-6 py-4">
                            <div class="font-bold text-xl mb-2">{product.name}</div>
                            <p class="text-gray-700 text-base">
                                {product.description}
                            </p>
                        </div>
                        <div class="px-6 pt-4 pb-2">
                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">${product.price}</span>
                        </div>
                    </div>
                ))
            }
        </div>



    </>);
}

export default Categories;