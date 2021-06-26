# MySQL Employee Tracker

## Description
The goal of this assignment was to build a command-line application for a company to track and manage a database of employee information. This application uses the [MySQL](https://www.npmjs.com/package/mysql) NPM package to connect to a MySQL database and perform queries, the [InquirerJs](https://www.npmjs.com/package/inquirer/v/0.2.3) NPM package to interact with the user via the command-line, and [console.table](https://www.npmjs.com/package/console.table) to print MySQL rows to the console.  

## User Story
"As a business owner, I want to be able to view and manage the departments, roles, and employees in my company, so that I can organize and plan my business."

## Installation
My first step in developing this application was to create the basic file structure necessary for the project. I created a db folder for my schema.sql file with all of my database information. When I ran the contents of this file in MySQL Workbench, I was able to create the ecommmerce_db database, as well as the department, role, and employee tables with their required columns. 

Next, installed the [MySQL](https://www.npmjs.com/package/mysql), [InquirerJs](https://www.npmjs.com/package/inquirer/v/0.2.3), and [console.table](https://www.npmjs.com/package/console.table) npm packages and required them in my index.js file. When I orignally began writing my code, I had a separate connection.js file in a config folder that handled my server and MySQL connections, but later realized that I could instead include this code at the top of my index.js file. 

With my database connected and server effectively spinning up, I began creating the functions needed to add departments, roles, and employees, view departments, roles and employees, and update employee roles. Using both inquirer and MySQL, I was able to successfully get the application to function! 

## Usage
[Here](https://github.com/go-yasi/mysql-employee-tracker) is a link to the GitHub repository containing my application code.  
[Here](https://www.loom.com/share/4a49ce9519c04069ae8dac91da4cbf0c) is a link to a video walkthrough demonstrating the functionality of my code.

## Conclusion
I enjoyed developing this application and feel that it really helped solidify my understanding of how there are many ways to interact with information stored in a database. Although I didn't quite get the "bonus" functions working, I do plan to return to this assignment later to try and add them to the application! 