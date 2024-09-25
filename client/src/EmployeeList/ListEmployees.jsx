import { useEffect, useState } from 'react';
import { getEmployees, deleteEmployee } from '../employeeCrud/EmployeeRoutes';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, useMediaQuery } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';

function ListEmployees({ handleEdit }) {
  const [employees, setEmployees] = useState([]);
  const isMobile = useMediaQuery('(max-width:600px)'); // Detecta si la pantalla es móvil

  useEffect(() => {
    const axiosEmployee = async () => {
      try {
        const employeeData = await getEmployees();
        setEmployees(employeeData);
        console.log(employeeData);
      } catch (error) {
        console.error("Error en obtener los empleados desde el front:", error);
        throw error;
      }
    };
    axiosEmployee();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees(employees.filter((employee) => employee.id !== id));
      Swal.fire({
        icon: 'success',
        title: 'Empleado eliminado',
        text: 'El empleado ha sido eliminado exitosamente.',
      });
    } catch (error) {
      console.error("Error en borrar el empleado:", error);
      throw error;
    }
  };

  return (
    <TableContainer component={Paper} sx={{ maxWidth: isMobile ? '100%' : '90%', margin: 'auto', marginTop: 4, padding: isMobile ? 1 : 3 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', marginBottom: isMobile ? 1 : 2, fontSize: isMobile ? '1.5rem' : '2rem' }}>
        Lista de Empleados
      </Typography>
      <Table sx={{ minWidth: 650, fontSize: isMobile ? '0.8rem' : '1rem' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', fontSize: isMobile ? '0.9rem' : '1.1rem' }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: isMobile ? '0.9rem' : '1.1rem' }}>Age</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: isMobile ? '0.9rem' : '1.1rem' }}>Position</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: isMobile ? '0.9rem' : '1.1rem' }}>Experience (Years)</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: isMobile ? '0.9rem' : '1.1rem' }}>Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.age}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.experience}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(employee)} color="primary" size={isMobile ? "small" : "medium"}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(employee.id)} color="secondary" size={isMobile ? "small" : "medium"}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListEmployees;
