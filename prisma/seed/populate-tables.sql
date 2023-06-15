copy textbooks(name, author, edition) from './choku-data/t.csv' DELIMITER ',' CSV HEADER;
copy chapters(name, textbook_id) from './choku-data/c.csv' DELIMITER ',' CSV HEADER;
copy subchapters(name, chapter_id) from './choku-data/subc.csv' DELIMITER ',' CSV HEADER;
copy subtopics(name, subchapter_id) from './choku-data/subt.csv' DELIMITER ',' CSV HEADER;