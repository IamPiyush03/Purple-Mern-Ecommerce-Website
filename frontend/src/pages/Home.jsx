import React from 'react';
import { Box, Typography, Button, Grid, Container, TextField, Card, CardMedia, CardContent } from '@mui/material';

// Import images
import slider1 from '../assets/images/slider_1.jpg';
import slider2 from '../assets/images/slider_2.jpg';

const Home = () => {
  return (
    <Box className="super_container">

      {/* Slider */}
      <Box className="main_slider" sx={{ backgroundImage: `url(${slider1})`, height: '400px', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center' }}>
        <Container sx={{ height: '100%' }}>
          <Grid container alignItems="center" sx={{ height: '100%' }}>
            <Grid item xs={12}>
              <Box className="main_slider_content" textAlign="center" sx={{ color: 'black', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
                <Typography variant="h6">Autumn / Winter Collection 2024</Typography>
                <Typography variant="h1">Up to 40% Off Selected Items</Typography>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  sx={{ mt: 2 }} 
                  href="categories"
                >
                  Shop Now
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Additional Sliders */}
      {[slider2].map((img, index) => (
        <Box key={index} className="main_slider" sx={{ backgroundImage: `url(${img})`, height: '400px', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center' }}>
          <Container sx={{ height: '100%' }}>
            <Grid container alignItems="center" sx={{ height: '100%' }}>
              <Grid item xs={12}>
                <Box className="main_slider_content" textAlign="center" sx={{ color: 'black', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
                  <Typography variant="h6">Exclusive Collection 2024</Typography>
                  <Typography variant="h1">50% Off on First Purchase</Typography>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    sx={{ mt: 2 }} 
                    href="categories"
                  >
                    Shop Now
                  </Button>    
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      ))}

      

      {/* Newsletter Section */}
      <Box className="newsletter" sx={{ py: 5, bgcolor: '#f5f5f5' }}>
        <Container>
          <Grid container alignItems="center">
            <Grid item lg={6}>
              <Typography variant="h4">Newsletter</Typography>
              <Typography>Subscribe to our newsletter and get 20% off your first purchase</Typography>
            </Grid>
            <Grid item lg={6}>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <TextField fullWidth label="Your email" variant="outlined" required />
                  </Grid>
                  <Grid item xs={4}>
                    <Button variant="contained" type="submit">Subscribe</Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Box>

    </Box>
  );
};

export default Home;