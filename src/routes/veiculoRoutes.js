const express = require('express');
const router = express.Router();
const veiculoController = require('../controllers/veiculoController');

router.post('/veiculos', veiculoController.createVeiculo);
router.get('/veiculos', veiculoController.getVeiculos);
router.get('/veiculos/:id', veiculoController.getVeiculoById);
router.put('/veiculos/:id', veiculoController.updateVeiculo);
router.delete('/veiculos/:id', veiculoController.deleteVeiculo);

module.exports = router;