import { getAllCategories, getCategoryById , getCategoryByProject, updateCategoryAssignments, createCategory, updateCategory } from '../models/categories.js';
import { getProjectsByCategoryId, getProjectDetails } from '../models/projects.js';
import { body, validationResult } from 'express-validator';

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

const categoryValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Category name is required')
        .isLength({ min: 3, max: 100 }).withMessage('Category name must be between 3 and 100 characters')
];

const showNewCategoryForm = (req, res) => {
    res.render('new-category', { title: 'New Category' });
};

const processNewCategoryForm = async (req, res) => {
    const { name } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-category');
    }

    const categoryId = await createCategory(name);

    req.flash('success', 'Category created successfully!');
    res.redirect(`/category/${categoryId}`);
};

const showEditCategoryForm = async (req, res) => {
    const id = req.params.id;

    const category = await getCategoryById(id);

    res.render('edit-category', {
        title: 'Edit Category',
        category
    });
};

const processEditCategoryForm = async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });

        return res.redirect('/edit-category/' + id);
    }

    await updateCategory(id, name);

    req.flash('success', 'Category updated successfully!');
    res.redirect(`/category/${id}`);
};

export {
  showCategoriesPage, 
  showCategoryDetailsPage, 
  showCategoryByProject, 
  showAssignCategoriesForm, 
  processAssignCategoriesForm, 
  categoryValidation, 
  showNewCategoryForm, 
  processNewCategoryForm, 
  showEditCategoryForm,
  processEditCategoryForm
}; 