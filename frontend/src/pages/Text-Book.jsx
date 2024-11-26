import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

const TextBook = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchBooks = async () => {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setResults(data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error);
      setResults([]);
    }
  };

  const flipbooks = [
    {
      title: 'Denotation & Connotation',
      src: 'https://cdn.flipsnack.com/widget/v2/widget.html?hash=fu56p2gym',
    },
    {
      title: 'Compositions & Narratives',
      src: 'https://cdn.flipsnack.com/widget/v2/widget.html?hash=fxcj4pmko',
    },
    {
      title: 'Patterns & Types (Fonts)',
      src: 'https://cdn.flipsnack.com/widget/v2/widget.html?hash=ft95r3fmz',
    },
  ];

  return (
    <Box sx={{ padding: '2rem', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      {/* Title */}
      <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
        Text Book
      </Typography>

      {/* Search Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 600,
          margin: '0 auto',
        }}
      >
        <TextField
          fullWidth
          label="Search for books"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={searchBooks}
          sx={{ textTransform: 'capitalize', px: 4 }}
        >
          Search
        </Button>
      </Box>

      {/* Book Search Results */}
      {results.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
            Search Results
          </Typography>
          <Grid container spacing={2}>
            {results.map((book) => (
              <Grid item xs={12} sm={6} md={4} key={book.id}>
                <Card sx={{ height: '100%' }}>
                  {book.volumeInfo.imageLinks?.thumbnail && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={book.volumeInfo.imageLinks.thumbnail}
                      alt={book.volumeInfo.title}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {book.volumeInfo.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Flipbooks Section */}
      <Box sx={{ mt: 6 }}>
        <Typography
          variant="h5"
          align="center"
          sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}
        >
          Flipbooks
        </Typography>
        <Grid container spacing={3}>
          {flipbooks.map((flipbook, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {flipbook.title}
                  </Typography>
                  <Box sx={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
                    <iframe
                      src={flipbook.src}
                      width="100%"
                      height="300"
                      seamless="seamless"
                      scrolling="no"
                      frameBorder="0"
                      allowFullScreen
                      style={{ border: 'none' }}
                      title={flipbook.title}
                    ></iframe>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default TextBook;
