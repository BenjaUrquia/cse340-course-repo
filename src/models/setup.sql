-- Organization Table
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);
-- Insert data to Organization Table
INSERT INTO ORGANIZATION (NAME, DESCRIPTION, CONTACT_EMAIL, LOGO_FILENAME)
VALUES (
        'BrightFuture Builders',
        'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
        'info@brightfuturebuilders.org',
        'brightfuture-logo.png'
    ),
    (
        'GreenHarvest Growers',
        'An urban farming collective promoting food sustainability and education in local neighborhoods.',
        'contact@greenharvest.org',
        'greenharvest-logo.png'
    ),
    (
        'UnityServe Volunteers',
        'A volunteer coordination group supporting local charities and service initiatives.',
        'hello@unityserve.org',
        'unityserve-logo.png'
    );
-- Service Projects Table
CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    date DATE NOT NULL,
    CONSTRAINT fk_organization FOREIGN KEY (organization_id) REFERENCES organization(organization_id) ON DELETE CASCADE
);
-- Insert projects first organization
INSERT INTO service_project (
        organization_id,
        title,
        description,
        location,
        date
    )
VALUES (
        1,
        'Community Playground Build',
        'Building a sustainable playground for neighborhood children.',
        'Denver, CO',
        '2026-06-15'
    ),
    (
        1,
        'Eco Housing Renovation',
        'Renovating low-income housing using green materials.',
        'Austin, TX',
        '2026-07-10'
    ),
    (
        1,
        'Bridge Repair Initiative',
        'Repairing pedestrian bridges in rural communities.',
        'Boise, ID',
        '2026-08-05'
    ),
    (
        1,
        'School Classroom Expansion',
        'Building additional classrooms for overcrowded schools.',
        'Phoenix, AZ',
        '2026-09-12'
    ),
    (
        1,
        'Community Center Construction',
        'Constructing a multi-purpose community center.',
        'Albuquerque, NM',
        '2026-10-20'
    ),
    (
        2,
        'Urban Garden Installation',
        'Creating rooftop gardens to promote sustainable food production.',
        'Chicago, IL',
        '2026-05-22'
    ),
    (
        2,
        'Community Compost Program',
        'Launching a compost education and collection program.',
        'Seattle, WA',
        '2026-06-18'
    ),
    (
        2,
        'School Garden Workshop',
        'Teaching students how to grow vegetables sustainably.',
        'Portland, OR',
        '2026-07-14'
    ),
    (
        2,
        'Neighborhood Greenhouse',
        'Building a greenhouse for year-round urban farming.',
        'San Diego, CA',
        '2026-08-09'
    ),
    (
        2,
        'Local Farmers Market Support',
        'Helping organize community farmers markets.',
        'Los Angeles, CA',
        '2026-09-01'
    ),
    (
        3,
        'Food Bank Volunteer Drive',
        'Recruiting volunteers to support local food banks.',
        'Boston, MA',
        '2026-05-12'
    ),
    (
        3,
        'Charity Fundraising Marathon',
        'Organizing a marathon to raise funds for charities.',
        'New York, NY',
        '2026-06-30'
    ),
    (
        3,
        'Senior Assistance Program',
        'Providing volunteers to assist elderly residents.',
        'Philadelphia, PA',
        '2026-07-21'
    ),
    (
        3,
        'Community Cleanup Day',
        'Organizing volunteers to clean parks and streets.',
        'Baltimore, MD',
        '2026-08-17'
    ),
    (
        3,
        'Holiday Gift Distribution',
        'Volunteers distributing gifts to families in need.',
        'Washington, DC',
        '2026-12-15'
    );
-- Category Table
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);
INSERT INTO category (name)
VALUES ('Construction'),
    ('Environmental'),
    ('Community Service'),
    ('Food & Agriculture');
-- Middle Table
CREATE TABLE service_project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (project_id, category_id),
    FOREIGN KEY (project_id) REFERENCES service_project(project_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE
);
INSERT INTO service_project_category (project_id, category_id)
VALUES (1, 1),
    (2, 3),
    (3, 1),
    (4, 1),
    (5, 1),
    (6, 4),
    (7, 4),
    (8, 4),
    (9, 1),
    (10, 3),
    (11, 3),
    (12, 3),
    (13, 3),
    (14, 2),
    (15, 3);
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_description TEXT
);
INSERT INTO roles (role_name, role_description)
VALUES ('user', 'Standard user with basic access'),
    ('admin', 'Administrator with full system access');
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES roles(role_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);