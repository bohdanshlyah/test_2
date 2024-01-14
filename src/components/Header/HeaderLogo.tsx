import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { AppRouter } from '@shared/enums';

const HeaderLogo = () => {
  return (
    <Typography>
      <Link
        style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}
        to={AppRouter.HOME}
      >
        Front Shop
      </Link>
    </Typography>
  );
};

export default HeaderLogo;
