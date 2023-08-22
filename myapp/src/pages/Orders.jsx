import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.post('http://localhost:3999/v1/orders', {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };



  return (
    <div>
      <h1>Your Orders</h1>
      {orders.map(order => (
        <div key={order._id}>
          <p>Order ID: {order._id}</p>
          <p>Total Amount: ${order.totalAmount}</p>
          <div>
            <p>Products Ordered:</p>
            <ul>
              {order.items.map(item => (
                <li key={item.product._id}>
                  <div className="order-item">
                    <img src={item.product.image} alt={item.product.title} className="product-image" />
                    <div className="product-details">
                      <p>{item.product.title}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
         
          <hr />
        </div>
      ))}
    </div>
  );
};

export default OrderPage;
