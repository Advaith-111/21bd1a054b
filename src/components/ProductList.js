import React, { useState, useEffect } from "react";
import { Container, Grid, Pagination } from "@mui/material";
import FilterBar from "./FilterBar";
import ProductCard from "./ProductCard";
import { registerAndGetToken, fetchProducts } from "../api";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    company: "",
    rating: 0,
    priceRange: [0, 1000],
    availability: "",
  });
  const [page, setPage] = useState(1);
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
          const { category, company, priceRange } = filters;
          const products = await fetchProducts(
            token,
            company,
            category,
            10, // or any other value for `top`
            priceRange[0],
            priceRange[1]
          );
          setProducts(products);
        } catch (error) {
          console.error("Fetching products error:", error);
        }
      };
      fetchData();
    }
  }, [token, filters, page]);

  return (
    <Container>
      <FilterBar filters={filters} setFilters={setFilters} />
      <Grid container spacing={3}>
        {products.map((product, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={10}
        page={page}
        onChange={(e, value) => setPage(value)}
      />
    </Container>
  );
};

export default ProductList;
