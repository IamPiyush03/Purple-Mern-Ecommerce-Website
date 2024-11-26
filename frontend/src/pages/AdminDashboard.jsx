import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
  Alert,
  Grid,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Manual JWT Decoder
const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to parse JWT", error);
    return null;
  }
};

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Validate token and auto-logout
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/login");
      return;
    }

    const decoded = parseJwt(token);
    const currentTime = Date.now() / 1000;
    if (!decoded || decoded.exp < currentTime) {
      localStorage.removeItem("adminToken");
      alert("Session expired. Please log in again.");
      navigate("/login");
    }
  }, [navigate]);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("http://localhost:5000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setErrorMessage("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product handler
  const handleAddProduct = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");
    if (!token) {
      setErrorMessage("Authentication required to add a product");
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", productPrice);
    formData.append("image", productImage);

    try {
      await axios.post("http://localhost:5000/api/products", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccessMessage("Product added successfully!");
      setErrorMessage("");
      fetchProducts();
      setProductName("");
      setProductPrice("");
      setProductImage(null);
    } catch (error) {
      setErrorMessage("Failed to add product. Please check your authentication.");
    }
  };

  // Delete product handler
  const handleDeleteProduct = async (id) => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setErrorMessage("Authentication required to delete a product");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccessMessage("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      setErrorMessage("Failed to delete product. Please try again.");
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}
      {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}

      <Grid container spacing={4}>
        {/* Add Product Form */}
        <Grid item xs={12} md={4}>
          <Box
            p={3}
            border={1}
            borderColor="grey.300"
            borderRadius={2}
            bgcolor="white"
          >
            <Typography variant="h6" gutterBottom>
              Add Product
            </Typography>
            <Box component="form" onSubmit={handleAddProduct}>
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
              <Button variant="contained" component="label" sx={{ my: 2 }}>
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
          </Box>
        </Grid>

        {/* Product List */}
        <Grid item xs={12} md={8}>
          <Box
            p={3}
            border={1}
            borderColor="grey.300"
            borderRadius={2}
            bgcolor="white"
          >
            <Typography variant="h6" gutterBottom>
              Product List
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.length > 0 ? (
                    products.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell>
                          {product.image && (
                            <img
                              src={`/uploads/${product.image}`}
                              alt={product.name}
                              style={{ width: 50, height: "auto" }}
                            />
                          )}
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>${parseFloat(product.price).toFixed(2)}</TableCell>
                        <TableCell>
                          <IconButton
                            color="secondary"
                            onClick={() => handleDeleteProduct(product._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No products available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
