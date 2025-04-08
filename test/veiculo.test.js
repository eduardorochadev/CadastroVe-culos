const { expect } = require('chai');
const controller = require('../src/controllers/veiculoController');
const fs = require('fs').promises;
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/veiculos.json');
const counterFilePath = path.join(__dirname, '../data/id_counter.json');

// Helpers para mockar req/res
function createRes() {
  return {
    statusCode: null,
    jsonData: null,
    sendCalled: false,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.jsonData = data;
    },
    send() {
      this.sendCalled = true;
    }
  };
}

describe('Controller de Veículos', () => {

  // Limpa os arquivos antes de cada teste
  beforeEach(async () => {
    await fs.writeFile(dataFilePath, '[]', 'utf8');
    await fs.writeFile(counterFilePath, JSON.stringify({ counter: 0 }), 'utf8');
  });

  it('GET /veiculos - Deve retornar um array de veículos', async () => {
    const req = {};
    const res = createRes();

    await controller.getVeiculos(req, res);

    expect(res.statusCode).to.equal(200);
    expect(res.jsonData).to.be.an('array');
  });

  it('POST /veiculos - Deve criar um novo veículo', async () => {
    const req = {
      body: {
        placa: 'ABC1234',
        chassi: 'XYZ987654321',
        renavam: '12345678910',
        modelo: 'Civic',
        marca: 'Honda',
        ano: '2020'
      }
    };
    const res = createRes();

    await controller.createVeiculo(req, res);

    expect(res.statusCode).to.equal(201);
    expect(res.jsonData).to.include({
      placa: 'ABC1234',
      modelo: 'Civic',
      marca: 'Honda'
    });
  });

  it('GET /veiculos/:id - Deve retornar veículo por ID', async () => {
    const reqCreate = {
      body: {
        placa: 'DEF5678',
        chassi: 'LMN654321987',
        renavam: '10987654321',
        modelo: 'Corolla',
        marca: 'Toyota',
        ano: '2021'
      }
    };
    const resCreate = createRes();
    await controller.createVeiculo(reqCreate, resCreate);

    const id = resCreate.jsonData.id;
    const req = { params: { id } };
    const res = createRes();

    await controller.getVeiculoById(req, res);

    expect(res.statusCode).to.equal(200);
    expect(res.jsonData.id).to.equal(id);
    expect(res.jsonData.modelo).to.equal('Corolla');
  });

  it('PUT /veiculos/:id - Deve atualizar um veículo existente', async () => {
    const reqCreate = {
      body: {
        placa: 'GHI4321',
        chassi: 'OPQ321654987',
        renavam: '11223344556',
        modelo: 'Fiesta',
        marca: 'Ford',
        ano: '2018'
      }
    };
    const resCreate = createRes();
    await controller.createVeiculo(reqCreate, resCreate);

    const id = resCreate.jsonData.id;
    const req = {
      params: { id },
      body: {
        placa: 'GHI4321',
        chassi: 'OPQ321654987',
        renavam: '11223344556',
        modelo: 'Focus',
        marca: 'Ford',
        ano: '2019'
      }
    };
    const res = createRes();

    await controller.updateVeiculo(req, res);

    expect(res.statusCode).to.equal(200);
    expect(res.jsonData.modelo).to.equal('Focus');
    expect(res.jsonData.ano).to.equal('2019');
  });

  it('DELETE /veiculos/:id - Deve deletar um veículo existente', async () => {
    const reqCreate = {
      body: {
        placa: 'JKL0001',
        chassi: 'RST112233445',
        renavam: '99887766554',
        modelo: 'Uno',
        marca: 'Fiat',
        ano: '2010'
      }
    };
    const resCreate = createRes();
    await controller.createVeiculo(reqCreate, resCreate);

    const id = resCreate.jsonData.id;
    const req = { params: { id } };
    const res = createRes();

    await controller.deleteVeiculo(req, res);

    expect(res.statusCode).to.equal(204);
    expect(res.sendCalled).to.be.true;
  });
});
