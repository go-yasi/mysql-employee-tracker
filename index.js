// require dependencies
const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');
const { restoreDefaultPrompts } = require('inquirer');

// connection
const connection = mysql.createConnection({
    host: 'localhost',
    port:3306,
    user: 'root',
    password:'password',
    database:'employee_DB', 
}); 

connection.connect((err) => {
    if (err) throw err;
    start();
});

const start = () => {
    inquirer
    .prompt({
        name: 'listoption',
        type: 'list',
        message: 'Hello! What would you like to do?',
        choices: [ 'Add Department', 'Add Role', 'Add Employee', 'View All Departments', 'View All Roles', 'View All Employees', 'Exit' ]
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
            // case 'Update Employee Role':
            //     return updateRole();
            case 'Exit':
                connection.end();
        }
    })
};

const addDepartment = () => {
    inquirer
    .prompt({
        name: 'newDept',
        type: 'input',
        message: "Okay, let's add a new department! \nPlease enter the new department name:",
    })
    .then((answer) => {
        connection.query(
            'INSERT INTO departments SET ?',
        {
            dept_name: answer.newDept,
        },
        (err) => {
            if (err) throw err;
            console.log('----------------------------------------------------------------------------------');
            console.log(`Congratualtions! You have successfully created the "${answer.newDept}" department.`);
            console.log('----------------------------------------------------------------------------------');
            start(); 
        }
        );
    })
};

const addRole = () =>{
    inquirer
    .prompt([
        {
            name: 'title',
            type: 'input',
            message: "Okay, let's add a new role! \nPlease enter the new role title:",
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Please enter the salary for this role:',
        },
        {
            name: 'deptId',
            type: 'input',
            message: 'Please enter the Department ID for this role:',
        }
    ])
    .then((answer) => {
        connection.query(
            'INSERT INTO roles SET ?',//
            {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.deptId,
            },
            (err) => {
                if (err) throw err;
                console.log('--------------------------------------------------------------------------');
                console.log(`Congratualtions! You have successfully created the "${answer.title}" role.`);
                console.log('--------------------------------------------------------------------------');
                start();
            });
    });
};


const addEmployee = () => {
    inquirer
    .prompt([
        {
            name: 'firstname',
            type: 'input',
            message: "Okay, let's add a new employee! \nWhat is the employee's first name?",
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
                console.log('---------------------------------------------------------------------------------------------------------');
                console.log(`Congratualtions! You have successfully created a new employee, ${answer.firstname} ${answer.lastname}.`);
                console.log('---------------------------------------------------------------------------------------------------------');
                start();
            }
        );
    });
}


const viewDepartments = () => {
    console.log('Pulling up department info...\n');
    connection.query('SELECT * FROM departments', (err, res) => {
      if (err) throw err;
      const table = cTable.getTable(res);
      console.log(table);
      start();
    });
};

const viewRoles = () => {
    console.log('Pulling up roles...\n');
    connection.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;
        const table = cTable.getTable(res);
        console.log(table);
        start();
    });
};

const viewEmployees = () => {
    console.log('Pulling up employees...\n');
    connection.query('SELECT * FROM employees', (err, res) => {
        if (err) throw err;
        const table = cTable.getTable(res);
        console.log(table);
        start();
    });
};


const updateRole = () => {
    connection.query("SELECT * FROM roles", (err, results) => {
        if (err) throw err;
        inquirer
        .prompt([
            {
                name: "uglyRole",
                type: "list",
                choices() {
                    const choiceArray = [];
                    results.forEach(({ role_title }) => {
                        choiceArray.push(role_title);
                    });
                    return choiceArray
                },
                message: "Which role would you like to update?",
            },
            {
                name: "newRole",
                type: "input",
                message: "What would you like to call the new role?",
            },
        ])
        .then((answer) => {
            let chosenRole;
            results.forEach((role) => {
                if (role.role_title === answer.uglyRole) {
                    chosenRole = role;
                }
            });

            if(chosenRole) {
                connection.query(
                    'UPDATE roles SET ? WHERE ?',
                    [
                        {
                            title: answer.newRole,
                        },
                        {
                            title: answer.uglyRole,
                        },
                    ],
                    (error) => {
                        if (error) throw err;
                        console.log('Role successfully updated!');
                        start();
                    }
                );
            } else {
                console.log('Oops! Something went wrong.');
                start();
            }
        });
    });
};