import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';


function Categories(props) {

    let { id } = useParams();
    let { categories, cart, setCart } = props;


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
        // Categories as square cards with image background 2 columns
        return (<>
            <div className="grid grid-cols-5 gap-4 mt-4 px-4">
                {
                    categories.map(category => (<Link key={category.id} to={`/categories/${category.id}`} className="text-lg font-bold text-black bg-white bg-opacity-10 p-1">
                        <div className="aspect-square bg-white mt-2 shadow-lg p-4" style={{ backgroundImage: `url(${category.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            {category.name}
                        </div>
                    </Link>))
                }
            </div>
        </>)
    }

    
    return (<>
        <div className="grid grid-cols-10 gap-4 mt-4">
            <div className="col-span-3">

                <div className="bg-white rounded-lg shadow-lg p-4">
                    
                    {
                        category.subCategories.map(child => (<Link to={`/categories/${child.id}`} className="text-blue-600 hover:text-blue-800">
                            <div key={child.id} className="bg-white mt-2 shadow-lg p-4" style={{ backgroundImage: `url(${child.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                <span className="text-lg font-bold text-black bg-white bg-opacity-10 p-1">{child.name}</span>
                            </div>
                        </Link>))
                    }
                </div>
            </div>
            <div className="col-span-7">
                <div className="grid grid-cols-2 gap-4">
                    {
                        products.map(product => (
                            <ProductCard key={product.id} product={product} cart={cart} setCart={setCart} />
                        ))
                    }
                </div>
            </div>
        </div>
    </>)
}

export default Categories;