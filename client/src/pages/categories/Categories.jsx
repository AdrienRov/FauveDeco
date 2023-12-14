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
    
    // Layout with subcategories in a list of small cards on the left, and products on the right
    return (<>
        <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="col-span-1">

                <div className="bg-white rounded-lg shadow-lg p-4">
                    {
                        parents.length > 0 && (<div className="mb-4">
                            {
                                // back button with parent name
                            }
                            <Link to={`/categories/${parents[0].id}`} className="text-blue-600 hover:text-blue-800">
                                <span className="text-lg font-bold text-black bg-white bg-opacity-10 p-1">{parents[0].name}</span>
                            </Link>
                            <hr className="my-2" />
                        </div>) || (<div className="mb-4">
                            <Link to={`/categories`} className="text-blue-600 hover:text-blue-800">
                                <span className="text-lg font-bold text-black bg-white bg-opacity-10 p-1">Categories</span>
                            </Link>
                            <hr className="my-2" />
                        </div>)
                    }
                    {
                        category.children.map(child => (<div key={child.id} className="bg-white mt-2 shadow-lg p-4" style={{ backgroundImage: `url(${child.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <Link to={`/categories/${child.id}`} className="text-blue-600 hover:text-blue-800">
                                <span className="text-lg font-bold text-black bg-white bg-opacity-10 p-1">{child.name}</span>
                            </Link>
                        </div>))
                    }
                </div>
            </div>
            <div className="col-span-2">
                <div className="grid grid-cols-3 gap-4">
                    {
                        products.map(product => (<div key={product.id} className="bg-white rounded-lg shadow-lg p-4">
                            <img src={product.images[0]} alt={product.name} className="w-full h-32 object-cover" />
                            <div className="mt-4">
                                <span className="text-lg font-bold">{product.name}</span>
                                <p className="mt-2 text-gray-600">{product.description}</p>
                                <Link to={`/products/${product.id}`} className="block mt-2 text-blue-600 hover:text-blue-800">View product</Link>
                            </div>
                        </div>))
                    }
                </div>
            </div>
        </div>
    </>)
}

export default Categories;