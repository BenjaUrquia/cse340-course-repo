import { getAllCategories, getCategoryById , getCategoryByProject } from '../models/categories.js';
import { getProjectsByCategoryId } from '../models/projects.js';

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

export {showCategoriesPage, showCategoryDetailsPage, showCategoryByProject}; 