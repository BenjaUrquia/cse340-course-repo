import db from './db.js'

const getAllCategories = async () => {
    const query = `
        SELECT category_id, name
        FROM public.category
        ORDER BY name;
    `;

    const result = await db.query(query);

    return result.rows;
}

// category details page
const getCategoryById = async (categoryId) => {
    const query = `
        SELECT 
            c.category_id,
	        c.name
        FROM public.category c

        WHERE c.category_id = $1;
    `;

    const query_params = [categoryId];
    const result = await db.query(query, query_params)
    return result.rows.length > 0 ? result.rows[0] : null;
}

const getCategoryByProject = async (projectId) => {
    const query = `
        SELECT 
            c.category_id,
            c.name
        FROM public.service_project_category spc

        JOIN public.category c
        ON spc.category_id = c.category_id

        WHERE spc.project_id = $1;
    `;

    const result = await db.query(query, [projectId]);

    return result.rows; 
}

const assignCategoryToProject = async(categoryId, projectId) => {
    const query = `
        INSERT INTO service_project_category (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
}

const updateCategoryAssignments = async(projectId, categoryIds) => {
    const deleteQuery = `
        DELETE FROM service_project_category
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
}

const createCategory = async (name) => {
    const query = `
        INSERT INTO public.category (name)
        VALUES ($1)
        RETURNING category_id;
    `;

    const result = await db.query(query, [name]);

    return result.rows[0].category_id;
};

const updateCategory = async (categoryId, name) => {
    const query = `
        UPDATE public.category
        SET name = $1
        WHERE category_id = $2
        RETURNING category_id;
    `;

    const result = await db.query(query, [name, categoryId]);

    if (result.rows.length === 0) {
        throw new Error('Category not found');
    }

    return result.rows[0].category_id;
};

export { getAllCategories, getCategoryById , getCategoryByProject, assignCategoryToProject, updateCategoryAssignments, createCategory, updateCategory }