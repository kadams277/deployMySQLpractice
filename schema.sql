/*

To run this file, we do the following in our Terminal:

1. Go to the directory of this sql file.

2. Get into our mysql console.

3. Run "source schema.sql"

*/

-- Create the database event_saver_db and specified it for use.
CREATE DATABASE wishes_db;
USE wishes_db;

-- Create the table events.
CREATE TABLE wishes
(
id int NOT NULL AUTO_INCREMENT,
wish varchar(255) NOT NULL,
PRIMARY KEY (id)
);

-- Insert a set of records.
INSERT INTO wishes (wish)
VALUES ('I wish I understood what Im doing.'),('I wish my dog wasnt an asshole.'), ('I wish I wont be unemployed in February.');
