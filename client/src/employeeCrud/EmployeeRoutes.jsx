import { apiBase } from "../baseURL/apiBase";

// GET

const getEmployees = async ()=>{
    try {
        const response = await apiBase.get('/empleados');
       
        return response.data
    } catch (error) {
        console.error('Error en obtener los empleados desde el front:', error);
    throw error;
    }
}

// ADD 

const addEmployee = async (employeeData) =>{
    try {
        const response = await apiBase.post('/create', employeeData);
        return response
    } catch (error) {
        console.error('Error en añadir el empleados desde el front:', error);
        throw error;
    }
}

// PUT

const updateEmployee = async (id, employeeData)=>{
try {
    const response = await apiBase.put(`/update/${id}`, employeeData);
    return response
} catch (error) {
    console.error('Error en actualizar el empleados desde el front:', error);
    throw error;
}
}

// DELETE

const deleteEmployee = async(id)=>{
    try {
        const response = await apiBase.delete(`/delete/${id}`)
        return response
    } catch (error) {
        console.error('Error en borrar el empleados desde el front:', error);
        throw error;
    }
}


export {getEmployees, addEmployee, updateEmployee , deleteEmployee}