import  Image404 from '@assets/images/img-404.svg?react';
import { Box, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import './NotFound.scss';

const NotFoundComponent = () => {
  return (
    <Box className="page-404">
      <Container maxWidth="md">
        <Typography variant="h1" mb={3}>
          <Image404 />
        </Typography>
        <Typography variant="h4" mb={1}>
          Page Not Found 
        </Typography>
        <Typography variant="h6" mb={5}>
          The page you’re looking for doesn’t exist.
        </Typography>
        <Typography variant="h6">
          <Link to="/" >Back Home</Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default NotFoundComponent;