import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, Grid, Card, CardContent, CardActions } from '@mui/material';

const Booking = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    // Dynamically load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    // Load cart items from localStorage
    loadCartItems();

    return () => {
      // Cleanup script if necessary
      document.body.removeChild(script);
    };
  }, []);

  const loadCartItems = () => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCartItems);
    const total = savedCartItems.reduce((acc, item) => acc + Math.max(item.price || 0, 0), 0);
    setTotalPrice(total);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({ ...bookingDetails, [name]: value });
  };

  const proceedToCheckout = () => {
    setShowBooking(true);
  };

  const proceedToPay = () => {
    if (!window.Razorpay) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const razorpayOptions = {
      key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your actual Razorpay Key ID
      amount: totalPrice * 100, // Amount in paisa
      currency: 'INR',
      name: 'Your Company Name',
      description: 'Purchase Description',
      handler: function (response) {
        alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
      },
      prefill: {
        name: bookingDetails.name,
        email: bookingDetails.email,
        contact: bookingDetails.phone,
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(razorpayOptions);
    rzp.open();
  };

  const removeItem = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    loadCartItems(); // Update total price after removing an item
  };

  if (cartItems.length === 0) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        Your cart is empty. Add some items to proceed.
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Your Cart
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box>
            {cartItems.map((item, index) => (
              <Card key={index} sx={{ marginBottom: '1rem' }}>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <img src={item.image} alt={item.name} style={{ width: '70px', height: '70px', borderRadius: '5px' }} />
                  <Typography variant="body1" sx={{ flexGrow: 1, paddingLeft: '1rem' }}>{item.name}</Typography>
                  <Typography variant="body1">${item.price.toFixed(2)}</Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained" color="error" onClick={() => removeItem(index)}>
                    Remove
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Order Summary</Typography>
              <Typography>
                <strong>Total: ${totalPrice.toFixed(2)}</strong>
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" onClick={proceedToCheckout}>
                Proceed to Checkout
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {showBooking && (
        <Box sx={{ marginTop: '2rem' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Booking Details
          </Typography>
          <form>
            <TextField
              label="Full Name"
              name="name"
              value={bookingDetails.name}
              onChange={handleInputChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={bookingDetails.email}
              onChange={handleInputChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone Number"
              name="phone"
              value={bookingDetails.phone}
              onChange={handleInputChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address"
              name="address"
              value={bookingDetails.address}
              onChange={handleInputChange}
              required
              fullWidth
              margin="normal"
              multiline
              rows={3}
            />
            <Button
              variant="contained"
              color="success"
              onClick={proceedToPay}
              sx={{ marginTop: '1rem' }}
            >
              Proceed to Pay
            </Button>
          </form>
        </Box>
      )}
    </Box>
  );
};

export default Booking;