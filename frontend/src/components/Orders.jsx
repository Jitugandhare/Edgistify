import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('Pending');
  const [orderStatus, setOrderStatus] = useState('Pending');
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  // fetch data
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:8000/order', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders: ", err);
      }
    };
    fetchOrders();
  }, [token]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get('http://localhost:8000/cart', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(res.data[0].products);
        calculateTotalPrice(res.data[0].products);
      } catch (err) {
        console.error("Error fetching cart: ", err);
      }
    };
    fetchCart();
  }, [token]);


  const calculateTotalPrice = (cart) => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  
  const placeOrder = async () => {
    if (cart.length === 0) {
      setError('Your cart is empty! Cannot place an order.');
      return;
    }

    
    const validProducts = cart.map((item) => ({
      productId: item._id, 
      quantity: item.quantity,
      price: item.price,
    }));

    if (validProducts.some((item) => !item.productId)) {
      setError('Some products are missing productId');
      return;
    }

    const orderData = {
      userId: localStorage.getItem('userId'),
      products: validProducts,
      totalPrice,
      shippingAddress,
      paymentStatus,
      orderStatus,
    };

    try {
      const res = await axios.post('http://localhost:8000/order/place', orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        
        await Promise.all(cart.map((item) =>
          axios.delete(`http://localhost:8000/cart/remove/${item._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        ));
        alert('Order placed successfully!');
        navigate('/orders');
      } else {
        setError('Failed to place order');
      }
    } catch (err) {
      console.error("Error placing order: ", err);
      setError('Failed to place order');
    }
  };

  return (
    <OrdersContainer>
      <OrdersTitle>Orders</OrdersTitle>
      <OrderForm>
        <Label>Shipping Address</Label>
        <Input
          type="text"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          required
        />
        {error && <ErrorText>{error}</ErrorText>}
        <Button onClick={placeOrder}>Place Order</Button>
      </OrderForm>
      {orders.map((order) => (
        <OrderItem key={order._id}>
          <OrderText>Total Price: ${order.totalPrice}</OrderText>
          <OrderText>Shipping Address: {order.shippingAddress}</OrderText>
          <OrderStatus status={order.orderStatus}>
            Status: {order.orderStatus}
          </OrderStatus>
        </OrderItem>
      ))}
    </OrdersContainer>
  );
};

export default Orders;

const OrdersContainer = styled.div`
  padding: 40px;
  background-color: #fafafa;
  border-radius: 12px;
  max-width: 900px;
  margin: 0 auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  color: #333;
`;

const OrdersTitle = styled.h2`
  text-align: center;
  color: #2c3e50;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 30px;
`;

const OrderItem = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
  }
`;

const OrderText = styled.p`
  font-size: 18px;
  color: #555;
  margin: 8px 0;
  line-height: 1.6;
`;

const OrderStatus = styled.p`
  font-weight: bold;
  color: ${({ status }) =>
    status === 'Delivered' ? '#27ae60' :
      status === 'Pending' ? '#f39c12' :
        '#e74c3c'};
  font-size: 16px;
  margin-top: 10px;
`;

const OrderForm = styled.div`
  margin-bottom: 30px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const Label = styled.label`
  font-size: 18px;
  margin-bottom: 8px;
  color: #34495e;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  color: #333;
  background-color: #fafafa;
  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: #3498db;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #3498db;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #2980b9;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 16px;
  text-align: center;
`;

