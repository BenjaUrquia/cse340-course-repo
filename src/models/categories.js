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

export { getAllCategories, getCategoryById , getCategoryByProject}