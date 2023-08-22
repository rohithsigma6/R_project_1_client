import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginHeader.css';
import axios from 'axios';

const LoginHeader = ({ children }) => {
    const navigate = useNavigate()
    useEffect(() => {
        const verification = async () => {
            const response = await axios.post("http://localhost:3999/v1/testroute", {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            if (response.data.success == false) {
                navigate("/")
            }
        }
        verification()
    }, [])
    return (
        <div>
            <header className="header">
                <div className="app-name">
                    <Link to="/home">Ecommm store</Link>
                </div>
                <nav className="nav-links">
                    <Link to="/home">Home</Link>
                    <Link to="/cart">Cart</Link>
                    <Link to="/orders">Orders</Link>
                    <button onClick={() => {
                        localStorage.removeItem("token")
                        navigate("/")
                    }}>Logout</button>
                </nav>
            </header>
            <div>
                {children}
            </div>
        </div>
    );
};

export default LoginHeader;
