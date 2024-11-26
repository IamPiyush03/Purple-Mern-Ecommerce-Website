import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Button, TextField, CircularProgress, Alert, Slider } from '@mui/material';
import axios from 'axios';

// Replace this with your backend URL
const BACKEND_API_URL = "http://localhost:5000/api/products"; 

const Categories = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [menuActive, setMenuActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [cartItems, setCartItems] = useState([]);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(BACKEND_API_URL);
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const toggleFavorite = (productId) => {
    setFavoriteItems(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const handleAddToCart = (product) => {
    setCartItems(prev => [...prev, product]);
    localStorage.setItem("cartItems", JSON.stringify([...cartItems, product]));
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    const filtered = products.filter(product => 
      product.price >= newValue[0] && product.price <= newValue[1]
    );
    setFilteredProducts(filtered);
  };

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  // Filtering categories
  const handleCategoryClick = (filter) => {
    if (filter === '*') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === filter.substr(1));
      setFilteredProducts(filtered);
    }
  };

  return (
    <Box className="super_container" sx={{ padding: '2rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Categories
      </Typography>

      <Button onClick={toggleMenu} variant="contained" color="primary" sx={{ marginBottom: '1rem' }}>
        {menuActive ? 'Close Menu' : 'Open Menu'}
      </Button>

      {menuActive && (
        <Box sx={{ marginBottom: '1rem' }}>
          <Typography variant="h6">Categories</Typography>
          <Button onClick={() => handleCategoryClick('*')}>All</Button>
          <Button onClick={() => handleCategoryClick('.category1')}>Category 1</Button>
          <Button onClick={() => handleCategoryClick('.category2')}>Category 2</Button>
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <TextField 
          variant="outlined" 
          label="Search Products" 
          value={searchTerm} 
          onChange={handleSearch} 
          fullWidth 
        />
      </Box>

      <Box sx={{ marginBottom: '1rem', width: '300px', margin: '0 auto' }}>
        <Typography variant="h6">Price Range: ${priceRange[0]} - ${priceRange[1]}</Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          step={10}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={2}>
          {filteredProducts.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Box 
                border={1} 
                borderColor="grey.300" 
                borderRadius="8px" 
                padding={2} 
                sx={{ 
                  boxShadow: 3, 
                  transition: 'transform 0.2s', 
                  '&:hover': { 
                    transform: 'scale(1.05)', 
                    boxShadow: 6 
                  }
                }}
              >
                <img 
                  src={product.image || 'images/default-product.png'} 
                  alt={product.name} 
                  style={{ width: '100%', height: 'auto', borderRadius: '5px' }} 
                />
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 1 }}>
                  {product.name}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  ${product.price.toFixed(2)}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleAddToCart(product)}
                  sx={{ marginTop: 1 }}
                  aria-label={`Add ${product.name} to cart`}
                >
                  Add to Cart
                </Button>
                <Button 
                  variant="outlined" 
                  color={favoriteItems.includes(product._id) ? "error" : "default"}
                  onClick={() => toggleFavorite(product._id)} 
                  sx={{ marginTop: 0.5 }}
                  aria-label={favoriteItems.includes(product._id) ? `Unfavorite ${product.name}` : `Favorite ${product.name}`}
                >
                  {favoriteItems.includes(product._id) ? 'Unfavorite' : 'Favorite'}
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Categories;