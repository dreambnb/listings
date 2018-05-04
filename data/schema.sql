-- drop old database if exists

drop database if exists dreambnb;

-- create databse 

create database dreambnb;

-- use database 

\c dreambnb;

-- create tables 

CREATE TABLE listings(
    id INT NOT NULL PRIMARY KEY,
    imageUrl VARCHAR(100),
    description VARCHAR(50),
    title VARCHAR(50),
    zipcode INT,
    price INT,
    numberReviews INT,
    avgRating DECIMAL,
    UNIQUE (id)
);


-- insert some values first 

-- INSERT INTO githubrepos (name,url)
-- VALUES  ("dylanqian29", "http://hellohello");


