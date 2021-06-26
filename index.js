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

const start = () => {
    inquirer
    .prompt({
        name: 'listoption',
        type: 'list',
        message: 'Hello! What would you like to do?',
        choices: [ 'Add Department', 'Add Role', 'Add Employee', 'View All Departments', 'View All Roles', 'View All Employees', 'Update Employee Role' ]
    }) 
    .then((answer) => {
        switch (answer.listoption){
            case 'Add Department':
                return addDepartment();
            case 'Add Role':
                return addRole();
            case 'Add Employee':
                return addEmployee();
            case 'View All Departments':
                return viewDepartments();
            case 'View All Roles':
                return viewRoles();
            case 'View All Employees':
                return viewEmployees();
            case 'Update Employee Role':
                return updateRole();
        }
    })
};

const addDepartment = () => {
    inquirer
    .prompt({
        name: 'newDept',
        type: 'input',
        message: 'Enter new department name',
    })
    .then((answer) => {
        connection.query(
            'INSERT INTO departments SET ?',
        {
            dept_name: answer.newDept,
        },
        (err) => {
            if (err) throw err;
            console.log('Your department was created successfully!');
            start(); 
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
        },
        {
            name: 'dptId',
            type: 'input',
            message: 'Enter Department ID',
        }
    ])
    .then((answer) => {
        connection.query(
            'INSERT INTO roles SET ?',//
            {
            title: answer.newRole,
            salary: answer.salary,
            department_id: answer.dptId,
            },
            (err) => {
                if (err) throw err;
                console.log('Congratualtions! You have successfully created a new role.');
                start();
            }
            );
    });
};


const addEmployee = () => {
    inquirer
    .prompt([
        {
            name: 'firstname',
            type: 'input',
            message: "What is the employee's first name?",
        },
        {
            name: 'lastname',
            type: 'input',
            message: "What is the employee's last name?",
        },
        {
            name: 'role',
            type: 'input',
            message: "What is the employee's role ID?",
        },
        {
            name: 'managerId',
            type: 'input',
            message: "What is the employee's manager's ID?",
        }
    ])
    .then((answer) => {
        connection.query(
            'INSERT INTO employees SET ?', 
            {
                first_name: answer.firstname,
                last_name: answer.lastname,
                role_id: answer.role,
                manager_id: answer.managerId,
            },
            (err) => {
                if (err) throw err;
                console.log('Congratualtions! You have successfully created a new employee.');
                start();
            }
        );
    });
}


const viewDepartments = () => {
    console.log('Pulling up department info...\n');
    connection.query('SELECT * FROM departments', (err, res) => {
      if (err) throw err;
      console.log(res);
      start();
    });
};

const viewRoles = () => {
    console.log('Pulling up roles...\n');
    connection.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;
        console.log(res);
        start();
    });
};

const viewEmployees = () => {
    console.log('Pulling up employees...\n');
    connection.query('SELECT * FROM employees', (err, res) => {
        if (err) throw err;
        console.log(res);
        start();
    });
};

start();

connection.connect((err) => {
    if (err) throw err;
  });