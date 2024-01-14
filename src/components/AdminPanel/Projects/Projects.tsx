import { Grid } from '@mui/material';
import { useState } from 'react';

import ButtonOpenModal from '@components/ButtonOpenModal/ButtonOpenModal';
import Title from '@components/Title/Title';

const ProjectsComponent = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <>
      <Title text="Projects" varian="h4"/>
      <Grid container spacing={2} sx={{ marginTop: '16px' }}>
        <Grid item xs={12} sm={4} md={4}>
          <ButtonOpenModal 
            text="Create project profile"
            onClick={handleOpenModal}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <ButtonOpenModal 
            text="Edit project profile"
            onClick={handleOpenModal}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <ButtonOpenModal 
            text="Remove project profile"
            onClick={handleOpenModal}
          />
        </Grid>
      </Grid>
      <div>Modal opened: {openModal}</div>
    </>
  );
};

export default ProjectsComponent;
