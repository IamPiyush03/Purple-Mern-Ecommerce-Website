import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Badge,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [accountMenuAnchorEl, setAccountMenuAnchorEl] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    updateCartCount();
    // Listen for changes in the cart
    window.addEventListener('storage', updateCartCount);
    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  const updateCartCount = () => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartCount(savedCartItems.length);
  };

  const handleCurrencyMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClick = (event) => {
    setAccountMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setAccountMenuAnchorEl(null);
  };

  // Direct navigation handler
  const navigateTo = (path) => {
    window.location.href = `/${path}`;
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#6a1b9a' }}>
      <Toolbar>
        {/* Brand Name */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer', textDecoration: 'none', color: 'white' }}
          onClick={() => navigateTo('home')}
        >
          Purple<span style={{ color: '#ffa726' }}>Star</span>
        </Typography>

        {/* Navigation Buttons */}
        {['home', 'categories', 'books', 'login', 'contact'].map((item) => (
          <Button
            key={item}
            color="inherit"
            onClick={() => navigateTo(item)}
            sx={{
              '&:hover': {
                backgroundColor: '#8e24aa',
              },
            }}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </Button>
        ))}

        {/* Currency Selector */}
        <Button
          color="inherit"
          onClick={handleCurrencyMenuClick}
          endIcon={<ArrowDropDownIcon />}
          sx={{
            '&:hover': {
              backgroundColor: '#8e24aa',
            },
          }}
        >
          USD
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {['CAD', 'AUD', 'EUR', 'GBP'].map((currency) => (
            <MenuItem key={currency} onClick={handleMenuClose}>
              {currency}
            </MenuItem>
          ))}
        </Menu>

        {/* My Account Menu */}
        <Button
          color="inherit"
          onClick={handleAccountMenuClick}
          endIcon={<ArrowDropDownIcon />}
          sx={{
            '&:hover': {
              backgroundColor: '#8e24aa',
            },
          }}
        >
          My Account
        </Button>
        <Menu
          anchorEl={accountMenuAnchorEl}
          open={Boolean(accountMenuAnchorEl)}
          onClose={handleMenuClose}
          onClick={() => navigateTo('login')}
        >
          <MenuItem onClick={handleMenuClose}>
            <AccountCircle style={{ marginRight: '8px' }} /> Sign In
          </MenuItem>
        </Menu>

        {/* Cart with Badge */}
        <IconButton color="inherit" onClick={() => navigateTo('booking')}>
          <Badge badgeContent={cartCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;