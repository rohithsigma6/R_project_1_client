import React, { useState } from 'react';
import axios from 'axios';
import './OrderModal.css';
import { useNavigate } from 'react-router-dom';

const OrderModal = ({ isOpen, onClose, cartItems, calculateSubtotal }) => {
    const navigate = useNavigate()
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [otp, setOtp] = useState('');

  const handlePlaceOrder = async () => {
    try {
      const totalAmount = calculateSubtotal();
      const paymentDetails =
        paymentMethod === 'online'
          ? `Card Number: ${cardNumber}, CVV: ${cvv}, OTP: ${otp}`
          : paymentMethod;

      const response = await axios.post(
        'http://localhost:3999/v1/placeorder',
        {
          items: cartItems,
          paymentDetails,
          shippingDetails: `${address}, ${city}, ${pincode}`,
          totalAmount,
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );

      console.log(response.data); 
      const clearCart = await axios.post('http://localhost:3999/v1/clearcart',{
        headers: {
            Authorization: localStorage.getItem('token')
          }
      })
      onClose();
      navigate("/home")

    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  if (!isOpen) return null;

  const isOnlinePayment = paymentMethod === 'online';

  const isOrderButtonEnabled =
    name &&
    phone &&
    email &&
    address &&
    city &&
    pincode &&
    (!isOnlinePayment || (cardNumber && cvv && otp));

  return (
    <div className="order-modal">
      <div className="modal-content">
        <h2>Place Your Order</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <div>
          <label>
            Payment Method:
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="online">Online Payment</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </label>
        </div>
        {isOnlinePayment && (
          <>
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
            <input
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </>
        )}
        <button onClick={handlePlaceOrder} disabled={!isOrderButtonEnabled}>
          Place Order
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default OrderModal;
