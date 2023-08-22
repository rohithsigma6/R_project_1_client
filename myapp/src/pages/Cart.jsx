import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css';
import OrderModal from './OrderModal';
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.post('http://localhost:3999/v1/getcartitems', {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      setCartItems(response.data.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      await axios.put('http://localhost:3999/v1/updatecart', {
        product: productId,
        quantity: newQuantity,
        headers: {
            Authorization: localStorage.getItem("token")
          }
      });
      fetchCartItems();
    } catch (error) {
      console.error('Error updating product quantity in cart:', error);
    }
  };

  const handleRemoveItem = async (productId) => {
    console.log("hiii")
    console.log(productId)
    try {
     const response  =  await axios.post(`http://localhost:3999/v1/removefromcart/${productId}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      console.log(response  )
      fetchCartItems();
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.product._id} className="cart-item">
              <img src={item.product.image} alt={item.product.title} className="product-image" />
              <div className="product-details">
                <h2>{item.product.title}</h2>
                <p>Quantity: 
                  <button onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}>-</button>
                  {item.quantity}
                  <button onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}>+</button>
                </p>
                <p>Price: ${item.product.price}</p>
                <p>Subtotal: ${item.product.price * item.quantity}</p>
              </div>
              <button className="remove-button" onClick={() => handleRemoveItem(item.product._id)}>Remove</button>
            </div>
          ))}
          <div className="total-price">
            <p>Total: ${calculateSubtotal()}</p>
            <button onClick={openModal}>Place Order</button>
          </div>
          <OrderModal
        isOpen={isModalOpen}
        onClose={closeModal}
        cartItems={cartItems}
        calculateSubtotal={calculateSubtotal}
      />
   
        </>
      )}
    </div>
  );
};

export default Cart;
