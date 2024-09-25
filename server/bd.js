const mysql = require("mysql");
const util = require('util');
const bd = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "crud_empleados",
});

bd.query = util.promisify(bd.query);

bd.connect((err) => {
  if (err) {
    console.error('Error en la conexión a la base de datos', err);
    return;
  } else {
    console.log('Conectado a la base de datos');
  }
});

module.exports = bd;

