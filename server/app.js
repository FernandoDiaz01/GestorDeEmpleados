const express = require("express");
const app = express();
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');

app.use(express.json());
app.use(cors());

app.use('/api', employeeRoutes); // Usa la ruta base '/api'

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
