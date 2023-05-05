create table if not exists textbooks (
  id serial NOT NULL, 
  name varchar(255) NOT NULL,
  author varchar(255),
  edition varchar(255),
  PRIMARY KEY (id)
);

create table if not exists chapters (
  id serial NOT NULL,
  textbook_id int NOT NULL,
  name varchar(255) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT chapters_ibfk_1 FOREIGN KEY (textbook_id) REFERENCES textbooks (id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table if not exists subchapters (
  id serial NOT NULL,
  chapter_id int NOT NULL,
  name varchar(255) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT subchapters_ibfk_1 FOREIGN KEY (chapter_id) REFERENCES chapters (id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table if not exists subtopics (
  id serial NOT NULL,
  subchapter_id int NOT NULL,
  name varchar(255) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT subtopics_ibfk_1 FOREIGN KEY (subchapter_id) REFERENCES subchapters (id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table if not exists progress (
  id serial NOT NULL,
  user_id text NOT NULL,
  subchapter_progress int[],
  selected_textbook_ids int[],
  subtopic_progress int[],
  PRIMARY KEY (id)
);