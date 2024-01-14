import { List } from '@mui/material';

import ProjectItem from '../ProjectItem/ProjectItem';
import { Project } from '../Projects/Projects';

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <List
      className="projectList"
      sx={{
        margin: '0 auto'
      }}
      component="ul"
    >
      {projects.map(item => (
        <ProjectItem key={item.id} project={item} />
      ))}
    </List>
  );
};

export default ProjectList;
