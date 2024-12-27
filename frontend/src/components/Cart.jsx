import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(''); 

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        
        const token = localStorage.getItem('token');
        if (!token) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        
        const res = await axios.get('http://localhost:8000/cart', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          setCartItems(res.data);  
        } else {
          setError('No cart data available');
        }

        setLoading(false);
      } catch (err) {
        if (err.response?.status === 401) {
          setError('Authentication failed: Invalid or expired token');
        } else {
          setError('Error fetching cart items');
        }
        setLoading(false);
        console.error(err);
      }
    };

    fetchCartItems();
  }, []);

  if (loading) {
    return <LoadingText>Loading...</LoadingText>;
  }

  if (error) {
    return <ErrorText>{error}</ErrorText>;
  }

  return (
    <CartContainer>
      <CartTitle>Cart</CartTitle>
      {cartItems.length === 0 ? (
        <EmptyCartMessage>Your cart is empty</EmptyCartMessage>
      ) : (
        cartItems.map((item) => (
          <CartItemContainer key={item._id}>
            <ItemText>{item.productName}</ItemText>
            <QuantityText>Quantity: {item.quantity}</QuantityText>
            <ItemPrice>Price: ${item.price}</ItemPrice>
          </CartItemContainer>
        ))
      )}
    </CartContainer>
  );
};

export default Cart;


const CartContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CartTitle = styled.h2`
  text-align: center;
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
`;

const CartItemContainer = styled.div`
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ItemText = styled.p`
  font-size: 18px;
  color: #555;
  margin: 5px 0;
`;

const QuantityText = styled(ItemText)`
  font-weight: bold;
`;

const ItemPrice = styled(ItemText)`
  color: #333;
  font-weight: bold;
`;

const EmptyCartMessage = styled.p`
  font-size: 18px;
  color: #888;
  text-align: center;
`;

const LoadingText = styled.p`
  font-size: 18px;
  color: #888;
  text-align: center;
`;

const ErrorText = styled.p`
  font-size: 18px;
  color: red;
  text-align: center;
`;
