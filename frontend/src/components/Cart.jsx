import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        console.log('Token found:', token);
        if (!token) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        const res = await axios.get('http://localhost:8000/cart', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data[0].products, 'getCart');
        if (res.status === 200) {
          setCartItems(res.data[0].products);
        } else {
          setError('No cart data available');
        }
        setLoading(false);
      } catch (err) {
        console.log('Error fetching cart items:', err);
        if (err.response?.status === 400) {
          setError('Authentication failed: Invalid or expired token');
        } else {
          setError('Error fetching cart items');
        }
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = (id) => {
    console.log('Remove item with id:', id);
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const handleQuantityChange = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: Math.max(item.quantity + change, 1) } : item
      )
    );
  };

  const handleOrderNow = () => {
    navigate('/order');
  };

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
        <>
          {cartItems.map((item) => (
            <CartItemContainer key={item._id}>
              <ItemImage src={item.image || 'https://via.placeholder.com/100'} alt={item.productName} />
              <ItemDetails>
                <ItemText>{item.productName}</ItemText>
                <QuantityContainer>
                  <QuantityButton onClick={() => handleQuantityChange(item._id, -1)}>-</QuantityButton>
                  <QuantityText>{item.quantity}</QuantityText>
                  <QuantityButton onClick={() => handleQuantityChange(item._id, 1)}>+</QuantityButton>
                </QuantityContainer>
                <ItemPrice>Price: ${item.price * item.quantity}</ItemPrice>
              </ItemDetails>
              <RemoveButton onClick={() => handleRemoveItem(item._id)}>Remove</RemoveButton>
            </CartItemContainer>
          ))}
          <OrderButton onClick={handleOrderNow}>Order Now</OrderButton>
        </>
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
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 15px;
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ItemText = styled.p`
  font-size: 18px;
  color: #555;
  margin: 5px 0;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const QuantityButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  padding: 5px 10px;
  cursor: pointer;
  margin: 0 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const QuantityText = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const ItemPrice = styled(ItemText)`
  color: #333;
  font-weight: bold;
`;

const RemoveButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff1a1a;
  }
`;

const OrderButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  display: block;
  margin: 20px auto;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
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
