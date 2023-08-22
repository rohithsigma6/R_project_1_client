import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductListing.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.post('http://localhost:3999/v1/getproducts', {}); // Replace with your backend API URL
            setProducts(response.data.data);
            setFilteredProducts(response.data.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    const handleSortedProducts = () => {

        const filteredProducts1 = filteredProducts.slice().sort((a, b) => {
            if (sortOrder === 'asc') {
                return parseFloat(a.price) - parseFloat(b.price);
            } else {
                return parseFloat(b.price) - parseFloat(a.price);
            }
        });
        setProducts(filteredProducts1);
        setFilteredProducts(filteredProducts1);
    }

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);
        if (category === '') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(product => product.category === category));
        }
    };

    return (
        <div className="product-listing">
             <ToastContainer />
            <header className="header">
                <div className="filters">
                    <label htmlFor="category">Filter by Category:</label>
                    <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="">All</option>
                        <option value="electronics">Electronics</option>
                        <option value="men's clothing">Men's Clothing</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <div className="sort-buttons">
                    <button onClick={() => {
                        setSortOrder('asc');
                        handleSortedProducts()
                    }}>Price Low to High</button>
                    <button onClick={() => {
                        setSortOrder('desc');
                        handleSortedProducts()
                    }}>Price High to Low</button>
                </div>
            </header>
            <main className="products-container">
                {filteredProducts.map(product => (
                    <div key={product._id} className="product-card">
                        <img src={product.image} alt={product.title} className="product-image" />
                        <h2 className="product-title">{product.title}</h2>
                        <p className="product-price">${product.price}</p>
                        <button className="add-to-cart" onClick={async (e) => {
                            e.preventDefault()
                            const response = await axios.post('http://localhost:3999/v1/addtocart', {
                                headers: {
                                    Authorization: localStorage.getItem("token")
                                },
                                
                                    "product": product._id,
                                    "quantity":1
                                
                            })
                            toast("Added to cart")
                            console.log(response)

                        }}>Add to Cart</button>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default ProductListing;
