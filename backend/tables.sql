-- Drop tables if they exist (order matters due to FK)
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS reader_stats;
DROP TABLE IF EXISTS persona;

-- Create Persona table
CREATE TABLE persona (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL UNIQUE
);

-- Insert the 8 example personas (expand to 12 later if needed)
INSERT INTO persona (title) VALUES
('Carpenter'),
('Binge Reader'),
('Old Timey'),
('Rereader'),
('Marathon Reader'),
('Novella Enthusiast'),
('Nonconformist'),
('Harmonizer');

-- Create Book Stats table
CREATE TABLE reader_stats (
    id SERIAL PRIMARY KEY,
    number_of_pages INT NOT NULL,
    number_of_books INT NOT NULL,
    average_rating FLOAT NOT NULL,
    -- store top 3 personas as foreign keys
    persona1_id INT REFERENCES persona(id),
    persona1_score FLOAT NOT NULL,
    persona2_id INT REFERENCES persona(id),
    persona2_score FLOAT NOT NULL,
    persona3_id INT REFERENCES persona(id),
    persona3_score FLOAT NOT NULL,

    -- store read per month for the "read" shelf
    read_per_month INTEGER[12],
    -- ratings 1-5
    ratings INTEGER[5] NOT NULL
);

-- Create Books table
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    book_stats_id INT REFERENCES reader_stats(id) ON DELETE CASCADE,
    bookId TEXT NOT NULL
);
