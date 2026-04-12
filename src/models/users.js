import db from './db.js'
import bcrypt from 'bcrypt';

const createUser = async (name, email, passwordHash) => {
    const default_role = 'user';
    const query = `
        INSERT INTO users (name, email, password_hash, role_id)
        VALUES ($1, $2, $3, (SELECT role_id FROM roles WHERE role_name = $4))
        RETURNING user_id
    `;
    const query_params = [name, email, passwordHash, default_role]
    const result = await db.query(query, query_params);

    if (result.rows.length === 0) {
        throw new Error('Failed to create user');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new user with ID:', result.rows[0].user_id);
    }

    return result.rows[0].user_id;
};

const findUserByEmail = async (email) => {

    const query = `
        SELECT u.user_id, u.email, u.password_hash, r.role_name 
        FROM users u
        JOIN roles r ON u.role_id = r.role_id
        WHERE u.email = $1
    `;

    const query_params = [email];

    const result = await db.query(query, query_params);

    if (result.rows.lenght === 0) {
        return null;
    }

    return result.rows[0];
};

const verifyPassword = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};


const authenticateUser = async (email, password) => {

    const user = await findUserByEmail(email);

    if (!user){
        return null;
    }

    const isValid = await verifyPassword(password, user.password_hash);

    if (!isValid) {
        return null;
    }

    delete user.password_hash;

    return user;
};

const getAllUsers = async () => {
    const query = `
        SELECT user_id, name, email, role_id
        FROM public.users
        ORDER BY name;
    `;

    const result = await db.query(query);
    return result.rows;
};

const addVolunteer = async (userId, projectId) => {
    const query = `
        INSERT INTO volunteer (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING;
    `;

    await db.query(query, [userId, projectId]);
};

const removeVolunteer = async (userId, projectId) => {
    const query = `
        DELETE FROM volunteer
        WHERE user_id = $1 AND project_id = $2;
    `;

    await db.query(query, [userId, projectId]);
};

const getUserVolunteerProjects = async (userId) => {
    const query = `
        SELECT sp.project_id, sp.title, sp.date
        FROM volunteer v
        JOIN service_project sp
        ON v.project_id = sp.project_id
        WHERE v.user_id = $1
        ORDER BY sp.date;
    `;

    const result = await db.query(query, [userId]);
    return result.rows;
};

const isUserVolunteer = async (userId, projectId) => {
    const query = `
        SELECT 1
        FROM volunteer
        WHERE user_id = $1 AND project_id = $2;
    `;

    const result = await db.query(query, [userId, projectId]);
    return result.rows.length > 0;
};

export { createUser, authenticateUser, getAllUsers, addVolunteer, removeVolunteer, getUserVolunteerProjects, isUserVolunteer };