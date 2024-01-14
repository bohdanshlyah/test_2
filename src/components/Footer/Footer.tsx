import CopyrightIcon from '@mui/icons-material/Copyright';
import { Box, Container, Typography } from '@mui/material';
import './Footer.scss';

const Footer = () => {

  const today = new Date();
  const year = today.getFullYear();

  return (
    <footer style={{ background: '#F9F9FB' }} className="footer">
      <Container sx={{
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        py: '25px'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <CopyrightIcon />
          <Typography>{year === 2023 ? year : '2023-' + year} Front-shop</Typography>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
