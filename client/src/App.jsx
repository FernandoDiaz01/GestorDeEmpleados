
import { useState } from 'react'
import './App.css'
import ListEmployees from './EmployeeList/listEmployees'
import FormEmployee from './Form/FormEmployee'




function App() {
  

  const [selectedEmployee, setSelectedEmployee] = useState(null)


  const handleEdit = (employee) => {
    setSelectedEmployee(employee)
  }

  const handleCancel = () => {
    setSelectedEmployee(null)
  } 
  

  return (
    <>

    <FormEmployee selectedEmployee={selectedEmployee} handleCancel={handleCancel} />
    <ListEmployees  handleEdit={handleEdit}/>
    </>

  )
}

export default App
