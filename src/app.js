const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const veiculoRoutes = require('./routes/veiculoRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', veiculoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
