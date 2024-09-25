const employeeServices = require("../services/employeeServices");

const getAllEmployees = async (req, res) => {
  try {
    const employees = await employeeServices.getAllEmployees();

    console.log("Empleados:", employees); // Mensaje actualizado

    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Este es un error de los controladores:", err); // Mensaje actualizado
  }
};

const createEmployee = async (req, res) => {
  try {
    const newEmployee = await employeeServices.createEmployee(req.body);
    res.status(201).json({ message: "Employee created", data: newEmployee });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, age, position, experience } = req.body;
  try {
    const response = await employeeServices.updateEmployee(id, {
      name,
      age: parseInt(age, 10),
      position,
      experience,
    });
    res.status(201).json({ message: "Employee updated", data: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await employeeServices.deleteEmployee(id);

    if (!result.success) {
      // Si no se encontró el empleado
      return res.status(404).json({ message: result.message });
    }

    // Si el empleado fue eliminado correctamente
    res.status(200).json({ message: result.message });
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ error: 'Error deleting employee: ' + error.message });
  }
};


module.exports = { getAllEmployees, createEmployee, updateEmployee, deleteEmployee };
