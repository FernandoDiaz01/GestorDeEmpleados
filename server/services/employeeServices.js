const bd = require("../bd");

const getAllEmployees = async () => {
  try {
    const response = await bd.query("SELECT * FROM empleados");
    return response;
  } catch (error) {
    console.log("Error al borrar el empleado", error);
  }
};


const createEmployee = async (employeeData) => {
    const {name,age, position,experience} = employeeData;
    try {
        const response = await bd.query('INSERT INTO empleados(name,age, position,experience) VALUES(?,?,?,?)',
            [name, age,  position, experience]);
            console.log(response)
        return response;
    } catch (error) {
        console.log('Error al registrar el empleado',error);
    }
}

const updateEmployee = async(id, employeeData)=>{
    const {name,age, position,experience} = employeeData;
    try {
        const response = await bd.query('UPDATE empleados SET name = ?, age = ?,  position = ?, experience = ? WHERE id = ?',[name,age, position,experience,id]);
        return response
    } catch (error) {
        console.log('Error al actualizar el empleado',error);
    }
}

const deleteEmployee = async (id) => {
    try {
      const response = await bd.query('DELETE FROM empleados WHERE id = ?', [id]);
      
      if (response.affectedRows === 0) {
    
        return { success: false, message: "Employee not found" };
      }
      
      return { success: true, message: "Employee deleted" };
    } catch (error) {
      console.log('Error al borrar el empleado:', error);
      throw new Error('Error deleting employee'); // Lanza el error para que lo capture el controlador
    }
  };
  

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
