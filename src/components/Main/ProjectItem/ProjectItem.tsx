import { Card, CardContent, Typography, Box } from '@mui/material';

import { Project } from '../Projects/Projects';

interface ProjectItemProps {
  project: Project;
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  project: { name, description, technologies, status }
}) => {
  return (
    <Card
      className="projectItem"
      sx={{
        backgroundColor: '#F9F9FBFA',
        borderRadius: '16px',
        cursor: 'pointer'
      }}
    >
      <CardContent sx={{ width: '100%', height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Typography
            component="h3"
            sx={{ fontSize: 18, fontWeight: '600', wordWrap: 'break-word' }}
            gutterBottom
          >
            {name}
          </Typography>
          <Typography
            component="span"
            sx={{
              fontSize: 12,
              color: '#fff',
              border: 'none',
              borderRadius: '25px',
              backgroundColor: status === 'in progress' ? '#ffa500' : '#008000',
              padding: '3px 6px'
            }}
            gutterBottom
          >
            {status}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: 16, marginBottom: '15px' }} gutterBottom>
          {description}
        </Typography>
        <Typography sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }} gutterBottom>
          {technologies.map(technologie => (
            <Typography
              component="span"
              key={technologie}
              sx={{
                fontSize: 14,
                border: '1px solid #000',
                borderRadius: '25px',
                padding: '5px 10px'
              }}
              gutterBottom
            >
              {technologie}
            </Typography>
          ))}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProjectItem;
