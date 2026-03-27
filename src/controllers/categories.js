import { getAllCategories, getCategoryById , getCategoryByProject, updateCategoryAssignments } from '../models/categories.js';
import { getProjectsByCategoryId, getProjectDetails } from '../models/projects.js';

const showCategoriesPage = async (req, res) => {
  const categories = await getAllCategories();
  console.log(categories);
  
  const title = 'Service Categories';
  res.render('categories', { title, categories });
};

// category details page
const showCategoryDetailsPage = async (req, res) => {
  const id = req.params.id;

  const category = await getCategoryById(id);
  const projects = await getProjectsByCategoryId(id);

  res.render('category', {
    title: category.name,
    category,
    projects
  });
};

const showCategoryByProject = async (req, res) => {
  const category = await getCategoryByProject(id);
  console.log(category);

  res.render(category);
}

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoryByProject(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

export {showCategoriesPage, showCategoryDetailsPage, showCategoryByProject, showAssignCategoriesForm, processAssignCategoriesForm }; 