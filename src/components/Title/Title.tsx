import { Box, Typography } from '@mui/material';

type TextProps = {
  text: string;
  varian?: 'h3' | 'h4' | 'h5';
};

const Title = ({ text, varian = 'h3' }: TextProps) => {
  return (
    <Box
      sx={{
        marginTop: 4
      }}
    >
      <Typography component="h1"
        variant={varian}
        align="center" 
        sx={{ textTransform: 'capitalize' }}>
        {text}
      </Typography>
    </Box>
  );
};

export default Title;
