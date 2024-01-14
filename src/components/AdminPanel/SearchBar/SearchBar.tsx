import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { ChangeEvent, FormEvent } from 'react';

import './SearchBar.scss';

type SearchBarProps = {
  setSearchQuery: (query: string) => void;
  autoFocus?: boolean;
  searchBarText?: string;
  label?: string;
  onSubmit?: () => any;
};

const SearchBar = ({
  onSubmit,
  setSearchQuery,
  searchBarText = 'Search...',
  label
}: SearchBarProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit');
    if (onSubmit) {
      onSubmit();
    }
  };
  return (
    <Box component="form" className="searchBarForm" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        id="search-bar"
        className="searchBarField"
        onInput={handleInputChange}
        label={label}
        variant="outlined"
        placeholder={searchBarText}
        size="small"
      />
      <IconButton type="submit" aria-label="search" className="searchBarButton">
        <SearchIcon style={{ fill: '#E40512' }} />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
