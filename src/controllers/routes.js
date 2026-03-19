import express from 'express';

import { showCategoriesPage } from './categories.js';
import { showHomePage } from './index.js';
import { showOrganizationsPage } from './organizations.js';
import { showProjectsPage } from './project.js';
import { testErrorPage } from './errors.js';
import { showProjectDetailsPage } from './project.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/categories', showCategoriesPage);
router.get('/organizations', showOrganizationsPage );
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);

// Test route for 500 errors
router.get('/test-error', testErrorPage);

export default router;