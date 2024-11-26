import React from 'react';
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { Facebook, Twitter, Google, Instagram } from '@mui/icons-material';

const ContactPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Page Heading */}
      <Typography variant="h4" align="center" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 4 }}>
        We’d love to hear from you! Drop us a message, and we’ll get back to you as soon as possible.
      </Typography>

      {/* Contact Details & Form */}
      <Grid container spacing={4}>
        {/* Contact Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Reach Us At
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Phone: (800) 686-6688
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Email: info@example.com
          </Typography>
          <Typography variant="body2" sx={{ mb: 4 }}>
            Hours: Mon-Fri, 8:00 AM - 6:00 PM
          </Typography>

          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <Box>
            <IconButton
              href="#"
              sx={{ color: '#3b5998', mr: 1 }}
              aria-label="Facebook"
            >
              <Facebook />
            </IconButton>
            <IconButton
              href="#"
              sx={{ color: '#1da1f2', mr: 1 }}
              aria-label="Twitter"
            >
              <Twitter />
            </IconButton>
            <IconButton
              href="#"
              sx={{ color: '#db4437', mr: 1 }}
              aria-label="Google"
            >
              <Google />
            </IconButton>
            <IconButton
              href="#"
              sx={{ color: '#e4405f' }}
              aria-label="Instagram"
            >
              <Instagram />
            </IconButton>
          </Box>
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Send Us a Message
          </Typography>
          <form>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Message"
              multiline
              rows={4}
              variant="outlined"
              margin="normal"
              required
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ mt: 2 }}
            >
              Send Message
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactPage;
