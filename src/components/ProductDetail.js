import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import { registerAndGetToken, fetchProductDetails } from "../api";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        const token = await registerAndGetToken();
        setToken(token);
      } catch (error) {
        console.error("Initialization error:", error);
      }
    };
    initialize();
  }, []);

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const product = await fetchProductDetails(token, id);
          setProduct(product);
        } catch (error) {
          console.error("Fetching product details error:", error);
        }
      };
      fetchData();
    }
  }, [token, id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="h4">{product.name}</Typography>
      <Typography>Company: {product.company}</Typography>
      <Typography>Category: {product.category}</Typography>
      <Typography>Price: ${product.price}</Typography>
      <Typography>Rating: {product.rating}</Typography>
      <Typography>Discount: {product.discount}%</Typography>
      <Typography>Availability: {product.availability}</Typography>
    </Container>
  );
};

export default ProductDetail;
