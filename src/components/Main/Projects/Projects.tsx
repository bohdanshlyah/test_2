import { Container, Typography, Box } from '@mui/material';

import ProjectList from '../ProjectList/ProjectList';

import Button from '@components/Button/Button';
import './Projects.scss';

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  status: string;
}

const Projects = () => {
  const projects = [
    {
      id: '1',
      name: 'Project 1',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
      technologies: ['React', 'Redux', 'TypeScript', 'CSS', 'HTML', 'Node', 'MongoDB'],
      status: 'completed'
    },
    {
      id: '2',
      name: 'Project 2',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
      technologies: ['React', 'Redux', 'TypeScript', 'CSS', 'HTML', 'Node', 'MongoDB'],
      status: 'in progress'
    },
    {
      id: '3',
      name: 'Project 3',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
      technologies: ['React', 'Redux', 'TypeScript', 'CSS', 'HTML', 'Node', 'MongoDB'],
      status: 'in progress'
    },
    {
      id: '4',
      name: 'Project 4',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
      technologies: ['React', 'Redux', 'TypeScript', 'CSS', 'HTML', 'Node', 'MongoDB'],
      status: 'in progress'
    },
    {
      id: '5',
      name: 'Project 5',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
      technologies: ['React', 'Redux', 'TypeScript', 'CSS', 'HTML', 'Node', 'MongoDB'],
      status: 'in progress'
    },
    {
      id: '6',
      name: 'Project 6',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
      technologies: ['React', 'Redux', 'TypeScript', 'CSS', 'HTML', 'Node', 'MongoDB'],
      status: 'completed'
    }
  ];
  // const [projects, setProjects] = useState<Project[]>([
  //   {
  //     id: '1',
  //     name: 'Project 1',
  //     description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  //     technologies: ['React', 'Redux', 'TypeScript', 'CSS', 'HTML', 'Node', 'MongoDB'],
  //     status: 'completed'
  //   },
  //   {
  //     id: '2',
  //     name: 'Project 2',
  //     description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  //     technologies: ['React', 'Redux', 'TypeScript', 'CSS', 'HTML', 'Node', 'MongoDB'],
  //     status: 'in progress'
  //   },
  //   {
  //     id: '3',
  //     name: 'Project 3',
  //     description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  //     technologies: ['React', 'Redux', 'TypeScript', 'CSS', 'HTML', 'Node', 'MongoDB'],
  //     status: 'in progress'
  //   },
  //   {
  //     id: '4',
  //     name: 'Project 4',
  //     description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  //     technologies: ['React', 'Redux', 'TypeScript', 'CSS', 'HTML', 'Node', 'MongoDB'],
  //     status: 'in progress'
  //   },
  //   {
  //     id: '5',
  //     name: 'Project 5',
  //     description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  //     technologies: ['React', 'Redux', 'TypeScript', 'CSS', 'HTML', 'Node', 'MongoDB'],
  //     status: 'in progress'
  //   },
  //   {
  //     id: '6',
  //     name: 'Project 6',
  //     description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  //     technologies: ['React', 'Redux', 'TypeScript', 'CSS', 'HTML', 'Node', 'MongoDB'],
  //     status: 'completed'
  //   }
  // ]);

  return (
    <Container
      component="div"
      maxWidth={'lg'}
      sx={{
        padding: '90px 15px'
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{
          marginBottom: '20px'
        }}
      >
        All projects
      </Typography>
      <ProjectList projects={projects} />
      <Box
        sx={{
          width: '200px',
          margin: '0 auto'
        }}
      >
        <Button
          type="button"
          variant="contained"
          sx={{
            width: '100%',
            mt: 4,
            mb: 2,
            backgroundColor: 'primary',
            textTransform: 'none',
            fontWeight: '600px'
          }}
          size="large"
        >
          Load more
        </Button>
      </Box>
    </Container>
  );
};

export default Projects;
