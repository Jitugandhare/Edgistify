import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId")
  const token = localStorage.getItem("authToken")


  useEffect(() => {
    axios
      .get('http://localhost:8000/product')
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching products');
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {

    // const cart = JSON.parse(localStorage.getItem('cart')) || [];
    // cart.push(product);
    // localStorage.setItem('cart', JSON.stringify(cart));
    const dataSend = {
      userId: userId,
      products: [
        {
          productId: product._id,
          quantity: 1
        }
      ]
    }

    axios.post("http://localhost:8000/cart/add",
      dataSend,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => {
      console.log(res.data)
      if (res.data.message === 'Product added to cart') {
        navigate("/cart")
      }

    }).catch((err) => console.log(err))

    console.log(dataSend, "products")
    // navigate('/cart'); 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ProductContainer>
      <Title>All Products</Title>
      <ProductListContainer>
        {products.map((product) => (
          <ProductCard key={product._id}>
            <ProductImage
              src={product.image || '/default-image.jpg'}
              alt={product.name}
            />
            <ProductTitle>{product.name}</ProductTitle>
            <ProductDescription>{product.description}</ProductDescription>
            <ProductPrice>Price: ${product.price}</ProductPrice>
            <ProductStock>Stock: {product.stock}</ProductStock>
            <AddToCartButton onClick={() => addToCart(product)}>
              Add to Cart
            </AddToCartButton>
          </ProductCard>
        ))}
      </ProductListContainer>
    </ProductContainer>
  );
};

export default ProductList;

// Styled components (same as before)

const ProductContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const ProductListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ProductCard = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 250px;
  margin: 10px;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const ProductTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
`;

const ProductDescription = styled.p`
  font-size: 14px;
  color: #555;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  color: #333;
  font-weight: bold;
`;

const ProductStock = styled.p`
  font-size: 14px;
  color: #888;
`;

const AddToCartButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    background-color: #218838;
  }
`;
