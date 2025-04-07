const fs = require('fs').promises;
const path = require('path');
const Veiculo = require('../models/veiculo');

const dataFilePath = path.join(__dirname, '../../data/veiculos.json');
const counterFilePath = path.join(__dirname, '../../data/id_counter.json');

async function readData() {
    try {
        const data = await fs.readFile(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function saveData(data) {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
}

async function readCounter() {
    try {
        const counterData = await fs.readFile(counterFilePath, 'utf8');
        return JSON.parse(counterData).counter || 0;
    } catch (error) {
        return 0;
    }
}

async function saveCounter(counter) {
    await fs.writeFile(counterFilePath, JSON.stringify({ counter }), 'utf8');
}

async function createVeiculo(req, res) {
    try {
        const { placa, chassi, renavam, modelo, marca, ano } = req.body;
        let id = await readCounter() + 1;
        await saveCounter(id);
        id = id.toString(); // Converter para string para consistência
        const novoVeiculo = new Veiculo(id, placa, chassi, renavam, modelo, marca, ano);
        const veiculos = await readData();
        veiculos.push(novoVeiculo);
        await saveData(veiculos);
        res.status(201).json(novoVeiculo);
    } catch (error) {
        console.error("Erro ao criar veículo:", error);
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