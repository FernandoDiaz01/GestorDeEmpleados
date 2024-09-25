const express = require('express');
const router = express.Router();
const employeeControllers = require('../controllers/employeeControllers');

router.get('/empleados', employeeControllers.getAllEmployees);
router.post('/create', employeeControllers.createEmployee);
router.put('/update/:id', employeeControllers.updateEmployee);
router.delete('/delete/:id', employeeControllers.deleteEmployee);

module.exports = router;
