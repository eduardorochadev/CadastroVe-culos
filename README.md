# Projeto Veículos API
>  Projeto para teste prático

# Estrutrua de pastas do projeto
>  backend_cadastro/
├── data/
│   └── veiculos.json
|   └── id_counter.json
├── src/
│   ├── controllers/
│   │   └── veiculoController.js
│   ├── models/
│   │   └── veiculo.js
│   ├── routes/
│   │   └── veiculoRoutes.js
│   └── app.js
├── test/
│   └── veiculo.test.js
├── package.json
└── README.md

## Requirements
- Node versão 1.2.3
- Mocha
  - Xyz
     
## Setup

npm install

## Project Run

npm start


## Test


npm test


## Endpoints

GET /veiculos - Deve retornar um array de veículos
POST /veiculos - Deve criar um novo veículo
GET /veiculos/:id - Deve retornar veículo por ID
PUT /veiculos/:id - Deve atualizar um veículo existente
DELETE /veiculos/:id - Deve deletar um veículo existente