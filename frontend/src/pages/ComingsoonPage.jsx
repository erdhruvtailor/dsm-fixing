import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import Comingsoon from '../assets/images/comingsoon.gif';

const ComingsoonPage = () => {
  return (
      <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            bgcolor: '#f0f0f0',
            textAlign: 'center',
            px: { xs: 2, sm: 4 },
          }}
      >
        <Container>
          <Typography variant="h2" sx={{ mb: 4, fontWeight: 'bold', color: '#333' }}>
            🚀 Coming Soon
          </Typography>
          <Typography variant="h5" sx={{ mb: 2, color: '#666' }}>
            We're working hard to get this page ready for you. Stay tuned!
          </Typography>
          <img src={Comingsoon} alt="Coming Soon" style={{ maxWidth: '100%', height: 'auto', marginBottom: '20px' }} />
          <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              href="/" // or any other relevant link
          >
            Go Back Home
          </Button>
        </Container>
      </Box>
  );
};

export default ComingsoonPage;
