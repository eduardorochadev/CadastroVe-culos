const express = require('express');
const bodyParser = require('body-parser');
const veiculoRoutes = require('./routes/veiculoRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/api', veiculoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});