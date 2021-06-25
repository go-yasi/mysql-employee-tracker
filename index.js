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
        choices: [ 'Add department', 'Add role', 'Add employee', 'View Departments', 'View Roles', 'View Employees', 'Update Employee Role' ]
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
            department_name: answer.newDept,
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
                console.log('Your auction was created successfully!');
                employeeOpt();
            }
            );
    });
};


const addEmp = () => {
    inquirer
    .prompt([
        {
        name: 'firstname',
        type: 'input',
        message: 'Enter employee first name',
        },
        {
        name: 'lastname',
        type: 'input',
        message: 'Enter employee last name',
        },
        {
        name: 'role',//
        type: 'input',
        message: 'roleid',//
        },
        {
        name: 'manid',
        type: 'input',
        message: 'managerid',//
        }
    ])
    .then((answer) => {
        connection.query(
            'INSERT INTO employees SET ?', //
            {
                first_name: answer.firstname,
                last_name: answer.lastname,
                role_id: answer.role,
                manager_id: answer.manid,
            },
            (err) => {
                if (err) throw err;
                console.log('Employee added successfully!');
                employeeOpt();
            }
        );
    });
}


const viewDepartment = () => {
    console.log('Pulling up department info...\n');
    connection.query('SELECT * FROM departments', (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
    });
  };


employeeOpt();

connection.connect((err) => {
    if (err) throw err;
    console.log(`Now listening`);
  });