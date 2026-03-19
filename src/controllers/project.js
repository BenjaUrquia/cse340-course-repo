import { getAllProjects } from '../models/projects.js';
import { getUpcomingProjects } from '../models/projects.js';
import { getProjectDetails } from '../models/projects.js';

let NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
  const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
  console.log(projects);
  const title = 'Upcoming Service Projects';

  res.render('projects', { title, projects });
};

const showProjectDetailsPage = async (req, res) => {

  const id = req.params.id;
  const projectDetails = await getProjectDetails(id);

  res.render('project', { title: projectDetails.title, project: projectDetails });
} 

export { showProjectsPage };
export { showProjectDetailsPage };