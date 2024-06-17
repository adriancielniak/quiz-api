import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Button, Paper } from '@material-ui/core';

function HomePage() {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Quiz Platform!
        </Typography>
        <Typography variant="h6" gutterBottom>
          Select an option below to get started:
        </Typography>
        <Box display="flex" justifyContent="center" marginTop="20px">
          <Button
            component={Link}
            to="/teacher"
            variant="contained"
            color="primary"
            style={{ margin: '10px' }}
          >
            Create Quiz
          </Button>
          <Button
            component={Link}
            to="/student"
            variant="contained"
            color="secondary"
            style={{ margin: '10px' }}
          >
            All Quizzes
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default HomePage;
