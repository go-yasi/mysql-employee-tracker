const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port:'3306',
    user: 'root',
    password:'password',
    database:'employee_DB', 
}); 

connection.connect((err) => {
  if (err) throw err;
  console.log(`Now listening on PORT ${connection.port}`);
  connection.end();
});