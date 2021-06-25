// require dependencies
const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port:3306,
    user: 'root',
    password:'password',
    database:'employee_DB', 
}); 

const employeeOpt = () => {
    inquirer
    .prompt({
        name: 'listoption',
        type: 'list',
        choices: [ 'Add department', 'Add role', 'Add employee', 'View Departments', 'View Roles', 'View Employees', 'Update Employee Role']//add exit for user?
    }) 
    .then((answer) => {
        switch (answer.listoption){
            case 'Add department':
                return addDept();
            case 'Add role':
                return addRole();
            case 'Add employee':
                return addEmp();
            case 'View Departments':
                return viewDep();
            case 'View Roles':
                return viewRoles();
            case 'View Employees':
                return viewEmp();
            case 'Update Employee Role':
                return changeErole();
        }
    })
};

const addDept = () => {
    // console.log('This function works!');
    inquirer
    .prompt({
        name: 'newDept',
        type: 'input',
        message: 'Enter new department name',
    })
    .then((answer) => {
        connection.query(
            'INSERT INTO department SET ?',
        {
            department_name: answer.item,//what the user typed in
        },
        (err) => {
            if (err) throw err;
            console.log('Your department was created successfully!');
            employeeOpt(); 
        }
        );
    })
};

const addRole = () =>{
    inquirer
    .prompt([
        {
        name: 'newRole',
        type: 'input',
        message: 'Enter new role title',
        },
        {
        name: 'salary',
        type: 'input',
        message: 'Enter Salary',
        }
    ])
    .then((answer) => {
        connection.query(
            'INSERT INTO roles SET ?',//
            {
            title: answer.newRole,
            salary: answer.salary,
            },
            (err) => {
                if (err) throw err;
                console.log('Your auction was created successfully!');
                employeeOpt();
            }
            );
    });
};








connection.connect((err) => {
    if (err) throw err;
    console.log(`Now listening on PORT ${connection.port}`);
    connection.end();
  });