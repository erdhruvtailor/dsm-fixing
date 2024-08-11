import React from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import matrimonialImage from '../assets/images/matrimonialHomepage.jpeg';
import businessImage from '../assets/images/businessHomepage.jpeg';
import connectionImage from '../assets/images/connectionHomepage.jpeg';
import blogImage from '../assets/images/BlogHomePage.jpeg';

const HomePage = () => {
  return (
      <>
        {/* Hero Section */}
        <Box sx={{ bgcolor: '#ffffff', py: { xs: 4, sm: 6 }, textAlign: 'center' }}>
          <Container>
            <Typography variant="h2" sx={{ mb: 2, fontWeight: 'bold', fontSize: { xs: '1.5rem', sm: '2.5rem' } }}>
              Welcome to Darji Community Common Platform
            </Typography>
            <Typography variant="h5" color="textSecondary" sx={{ mb: 4, fontWeight: '300' }}>
              Celebrating Unity, Growth, Love, Development, and Care
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 6 }}>
              Join us in fostering strong bonds, supporting each other's businesses, and nurturing the next generation.
            </Typography>
          </Container>
        </Box>

        {/* Sections Overview */}
        <Container sx={{ py: { xs: 6, sm: 8 } }}>
          <Typography variant="h4" align="center" gutterBottom>
            Explore Our Panel
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ boxShadow: '0px 4px 12px rgba(0,0,0,0.1)', borderRadius: 4, overflow: 'hidden' }}>
                <CardMedia
                    component="img"
                    alt="Matrimonial"
                    height="140"
                    image={matrimonialImage}
                    sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" sx={{ mb: 1 }}>
                    Matrimonial
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Find your perfect match within the Darji Samaj community.
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <Button
                      href="/matrimonialHomePage"
                      size="large"
                      variant="contained"
                      color="grey"
                  >
                    Explore Matrimonial
                  </Button>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ boxShadow: '0px 4px 12px rgba(0,0,0,0.1)', borderRadius: 4, overflow: 'hidden' }}>
                <CardMedia
                    component="img"
                    alt="Business"
                    height="140"
                    image={businessImage}
                    sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" sx={{ mb: 1 }}>
                    Business
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Grow your business network and opportunities within the community.
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <Button
                      href="/ComingsoonPage"
                      size="large"
                      variant="contained"
                      color="grey"
                  >
                    Explore Business
                  </Button>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ boxShadow: '0px 4px 12px rgba(0,0,0,0.1)', borderRadius: 4, overflow: 'hidden' }}>
                <CardMedia
                    component="img"
                    alt="Connections"
                    height="140"
                    image={connectionImage}
                    sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" sx={{ mb: 1 }}>
                    Connections
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Connect with fellow members and strengthen your community ties.
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <Button
                      href="/ComingsoonPage"
                      size="large"
                      variant="contained"
                      color="grey"
                  >
                    Explore Connections
                  </Button>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ boxShadow: '0px 4px 12px rgba(0,0,0,0.1)', borderRadius: 4, overflow: 'hidden' }}>
                <CardMedia
                    component="img"
                    alt="Blogs"
                    height="140"
                    image={blogImage}
                    sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" sx={{ mb: 1 }}>
                    Blogs
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Read the latest articles and updates from the community.
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <Button
                      href="/ComingsoonPage"
                      size="large"
                      variant="contained"
                      color="grey"
                  >
                    Explore Blogs
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>

        {/* Core Values Section */}
        <Box sx={{ bgcolor: '#fafafa', py: { xs: 6, sm: 8 } }}>
          <Container>
            <Typography variant="h4" align="center" gutterBottom>
              Our Core Values
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ boxShadow: '0px 4px 12px rgba(0,0,0,0.1)', borderRadius: 4, textAlign: 'center' }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Unity
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Bringing our community together, united in purpose and shared goals.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ boxShadow: '0px 4px 12px rgba(0,0,0,0.1)', borderRadius: 4, textAlign: 'center' }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Growth
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Encouraging personal and professional growth within our community.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ boxShadow: '0px 4px 12px rgba(0,0,0,0.1)', borderRadius: 4, textAlign: 'center' }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Love
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Fostering love and compassion in all our relationships.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ boxShadow: '0px 4px 12px rgba(0,0,0,0.1)', borderRadius: 4, textAlign: 'center' }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Development
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Supporting the development of skills and opportunities for future generations.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ boxShadow: '0px 4px 12px rgba(0,0,0,0.1)', borderRadius: 4, textAlign: 'center' }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Care
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Providing care and assistance to those in need within our community.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Footer */}
        <Box sx={{ bgcolor: '#f0f0f0', py: 3 }}>
          <Container>
            <Typography variant="body1" color="textSecondary" align="center">
              © 2024 Darji Community Common Platform. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </>
  );
};

export default HomePage;
