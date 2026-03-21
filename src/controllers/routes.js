import express from 'express';

import { showCategoriesPage , showCategoryDetailsPage} from './categories.js';
import { showHomePage } from './index.js';
import { showOrganizationsPage, showOrganizationDetailsPage  } from './organizations.js';
import { showProjectsPage, showProjectDetailsPage } from './project.js';
import { testErrorPage } from './errors.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/categories', showCategoriesPage);
router.get('/organizations', showOrganizationsPage );
router.get('/projects', showProjectsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetailsPage );

// Test route for 500 errors
router.get('/test-error', testErrorPage);

export default router;