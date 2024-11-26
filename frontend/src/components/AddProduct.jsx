import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Alert } from '@mui/material';

const AddProduct = ({ fetchProducts, setErrorMessage, setSuccessMessage }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [errorMessage, setLocalErrorMessage] = useState('');
  const [successMessage, setLocalSuccessMessage] = useState('');

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!productName || !productPrice || !productImage) {
      setLocalErrorMessage('All fields are required');
      return;
    }

    if (isNaN(productPrice) || productPrice <= 0) {
      setLocalErrorMessage('Price must be a positive number');
      return;
    }

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('price', productPrice);
    formData.append('image', productImage);

    try {
      await axios.post('http://localhost:5000/api/products', formData); // Replace with your API endpoint
      setLocalSuccessMessage('Product added successfully!');
      setLocalErrorMessage('');
      fetchProducts(); // Refresh the product list
      setProductName('');
      setProductPrice('');
      setProductImage(null);
      setSuccessMessage('Product added successfully!');
    } catch (error) {
      setLocalErrorMessage('Failed to add product');
      setErrorMessage('Failed to add product');
    }
  };

  return (
    <Box component="form" onSubmit={handleAddProduct} mb={4}>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}

      <TextField
        label="Product Name"
        fullWidth
        margin="normal"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        required
      />
      <TextField
        label="Product Price"
        type="number"
        fullWidth
        margin="normal"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
        required
      />
      <Button
        variant="contained"
        component="label"
        sx={{ my: 2 }}
      >
        Upload Image
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => setProductImage(e.target.files[0])}
        />
      </Button>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Add Product
      </Button>
    </Box>
  );
};

export default AddProduct;
