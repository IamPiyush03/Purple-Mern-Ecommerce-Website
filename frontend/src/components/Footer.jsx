import React from 'react';
import { Box, Typography, Link, Grid } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
// Use a placeholder icon for Skype
import LinkIcon from '@mui/icons-material/Link';
import PinterestIcon from '@mui/icons-material/Pinterest';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'lightgray', py: 4 }}>
      <Box className="container">
        <Grid container spacing={2}>
          {/* Footer Navigation */}
          <Grid item lg={6} xs={12}>
            <Box display="flex" justifyContent={{ xs: 'center', lg: 'flex-start' }}>
              <Box component="ul" sx={{ listStyle: 'none', padding: 0, display: 'flex' }}>
                <Box component="li" sx={{ mx: 2 }}><Link href="#">Blog</Link></Box>
                <Box component="li" sx={{ mx: 2 }}><Link href="#">FAQs</Link></Box>
                <Box component="li" sx={{ mx: 2 }}><Link href="/contact">Contact us</Link></Box>
              </Box>
            </Box>
          </Grid>

          {/* Footer Social Icons */}
          <Grid item lg={6} xs={12}>
            <Box display="flex" justifyContent={{ xs: 'center', lg: 'flex-end' }}>
              <Box component="ul" sx={{ listStyle: 'none', padding: 0, display: 'flex' }}>
                <Box component="li" sx={{ mx: 2 }}><Link href="#"><FacebookIcon /></Link></Box>
                <Box component="li" sx={{ mx: 2 }}><Link href="#"><TwitterIcon /></Link></Box>
                <Box component="li" sx={{ mx: 2 }}><Link href="#"><InstagramIcon /></Link></Box>
                <Box component="li" sx={{ mx: 2 }}><Link href="#"><LinkIcon /></Link></Box> {/* Placeholder for Skype */}
                <Box component="li" sx={{ mx: 2 }}><Link href="#"><PinterestIcon /></Link></Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Grid container>
          <Grid item lg={12} xs={12} textAlign="center">
            <Box mt={2}>
              <Typography variant="body2" color="textSecondary">
                ©2024 All Rights Reserved. Made with <span role="img" aria-label="heart">❤️</span> by <Link href="#">Purple</Link> & distributed by <Link href="#">Piyush Dhondge</Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;