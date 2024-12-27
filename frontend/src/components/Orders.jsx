import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:8000/orders', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <OrdersContainer>
      <OrdersTitle>Orders</OrdersTitle>
      {orders.map((order) => (
        <OrderItem key={order._id}>
          <OrderText>Total Price: ${order.totalPrice}</OrderText>
          <OrderStatus status={order.orderStatus}>Status: {order.orderStatus}</OrderStatus>
        </OrderItem>
      ))}
    </OrdersContainer>
  );
};

export default Orders;



const OrdersContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const OrdersTitle = styled.h2`
  text-align: center;
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
`;

const OrderItem = styled.div`
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const OrderText = styled.p`
  font-size: 16px;
  color: #555;
  margin: 5px 0;
`;

const OrderStatus = styled.p`
  font-weight: bold;
  color: ${({ status }) => (status === 'Delivered' ? 'green' : status === 'Pending' ? 'orange' : 'red')};
`;