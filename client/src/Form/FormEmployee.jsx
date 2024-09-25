import { useEffect, useState } from 'react';
import { updateEmployee, addEmployee, getEmployees } from '../employeeCrud/EmployeeRoutes';
import Swal from 'sweetalert2';
import { TextField, Button, Box } from '@mui/material';
import './formemployee.css';

function FormEmployee({ selectedEmployee, handleCancel }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [position, setPosition] = useState("");
  const [experience, setExperience] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedEmployee) {
      setName(selectedEmployee.name);
      setAge(selectedEmployee.age);
      setPosition(selectedEmployee.position);
      setExperience(selectedEmployee.experience);
      setIsEditing(true);
    } else {
      setIsEditing(false);
      setName("");
      setAge(0);
      setPosition("");
      setExperience(0);
    }
  }, [selectedEmployee]);

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (age <= 0) newErrors.age = "La edad debe ser mayor a 0.";
    if (!position.trim()) newErrors.position = "La posición es obligatoria.";
    if (experience < 0) newErrors.experience = "La experiencia no puede ser negativa.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const employeeData = {
      name,
      age,
      position,
      experience,
    };

    try {
      if (isEditing && selectedEmployee) {
        await updateEmployee(selectedEmployee.id, employeeData);
        Swal.fire({
          html: `<h1>Empleado actualizado</h1>
          <br>
           <p>El empleado <strong>${employeeData.name}</strong> fue actualizado con éxito</p>
           <br>
          `,
        });
      } else {
        await addEmployee(employeeData);
        Swal.fire({
          html: `<h1>Empleado registrado</h1>
          <br>
           <p>El empleado <strong>${employeeData.name}</strong> fue registrado con éxito</p>
           <br>
          `,
        });
      }
      handleCancel();
    } catch (error) {
      console.error('Error en agregar/editar el empleado:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error al procesar los datos del empleado',
      });
      throw error;
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: '600px', margin: 'auto', padding: 2 }}>
      <TextField
        label="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        required
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        label="Edad"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        type="number"
        fullWidth
        margin="normal"
        required
        error={!!errors.age}
        helperText={errors.age}
      />
      <TextField
        label="Posición"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        fullWidth
        margin="normal"
        required
        error={!!errors.position}
        helperText={errors.position}
      />
      <TextField
        label="Experiencia (Años)"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        type="number"
        fullWidth
        margin="normal"
        required
        error={!!errors.experience}
        helperText={errors.experience}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        {isEditing ? (
          <>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ backgroundColor: '#00796b', ':hover': { backgroundColor: '#004d40' }, padding: '8px 16px' }}
            >
              Guardar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancel}
              sx={{ borderColor: '#e57373', color: '#e57373', ':hover': { borderColor: '#d32f2f', color: '#d32f2f' }, padding: '8px 16px' }}
            >
              Cancelar
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ backgroundColor: '#1e88e5', ':hover': { backgroundColor: '#1565c0' }, padding: '8px 16px' }}
            >
              Registrar
            </Button>
            <Button
              variant="outlined"
              onClick={getEmployees}
              sx={{ borderColor: '#29b6f6', color: '#29b6f6', ':hover': { borderColor: '#0288d1', color: '#0288d1' }, padding: '8px 16px' }}
            >
              Obtener empleados
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}

export default FormEmployee;
