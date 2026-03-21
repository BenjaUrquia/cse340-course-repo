import { getAllProjects, getProjectDetails, getUpcomingProjects, getProjectsByOrganizationId, getProjectsByCategoryId } from '../models/projects.js';
import { getCategoryByProject } from '../models/categories.js';

let NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
  const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
  console.log(projects);
  const title = 'Upcoming Service Projects';

  res.render('projects', { title, projects });
};

// service project details page
const showProjectDetailsPage = async (req, res) => {
  const id = req.params.id;

  const projectDetails = await getProjectDetails(id);
  const categories = await getCategoryByProject(id);

  res.render('project', {
    title: projectDetails.title,
    project: projectDetails,
    categories
  });
};

export { showProjectsPage, showProjectDetailsPage,  };