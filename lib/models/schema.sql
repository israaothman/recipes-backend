DROP TABLE IF EXISTS favRecipes;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255)
);


CREATE TABLE IF NOT EXISTS favRecipes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    readyInMinutes INTEGER,
    summary VARCHAR(10000),
    vegetarian BOOLEAN,
    instructions VARCHAR(10000),
    sourceUrl VARCHAR(255),
    image VARCHAR(255),
    comment VARCHAR(255),
    user_id INTEGER,
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES users(user_id)
);
