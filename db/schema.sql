DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

SELECT * FROM departments;

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

SELECT * FROM roles;

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)
);

SELECT * FROM employees;