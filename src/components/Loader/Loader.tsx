import CircularProgress from '@mui/material/CircularProgress';
import './Loader.scss';

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <CircularProgress color="inherit" />
    </div>
  );
};

export default Loader;
