const fs = require('fs');
const path = require('path');
const {v4: uuidv4} = require('uuid');
const Veiculo = require('../models/veiculo');

const dataFilePath = path.join(__dirname, '../data/veiculos.json');

async function readData() {
    try {
        const data = await fs.promises.readFile(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function saveData(data) {
    try {
        await fs.promises.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('Erro ao salvar os dados:', error);
    }
}

async function createVeiculo(req, res) {
    try {
        const { placa, chassi, renavam, modelo, marca, ano } = req.body;
        const id = uuidv4();
        const novoVeiculo = new Veiculo(id, placa, chassi, renavam, modelo, marca, ano);
        const veiculos = await readData();
        veiculos.push(novoVeiculo);
        await saveData(veiculos);
        res.status(201).json(novoVeiculo);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar veículo.' });
    }
}

async function getVeiculos(req, res) {
    try {
        const veiculos = await readData();
        res.json(veiculos);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar veículos.' });
    }
}

async function getVeiculoById(req, res) {
    try {
        const { id } = req.params;
        const veiculos = await readData();
        const veiculo = veiculos.find(v => v.id === id);
        if (veiculo) {
            res.json(veiculo);
        } else {
            res.status(404).json({ message: 'Veículo não encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar veículo.' });
    }
}

async function updateVeiculo(req, res) {
    try {
        const { id } = req.params;
        const { placa, chassi, renavam, modelo, marca, ano } = req.body;
        const veiculos = await readData();
        const index = veiculos.findIndex(v => v.id === id);
        if (index !== -1) {
            veiculos[index] = { id, placa, chassi, renavam, modelo, marca, ano };
            await saveData(veiculos);
            res.json(veiculos[index]);
        } else {
            res.status(404).json({ message: 'Veículo não encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar veículo.' });
    }
}

async function deleteVeiculo(req, res) {
    try {
        const { id } = req.params;
        const veiculos = await readData();
        const updatedVeiculos = veiculos.filter(v => v.id !== id);
        if (veiculos.length > updatedVeiculos.length) {
            await saveData(updatedVeiculos);
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Veículo não encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar veículo.' });
    }
}

module.exports = {
    createVeiculo,
    getVeiculos,
    getVeiculoById,
    updateVeiculo,
    deleteVeiculo
};