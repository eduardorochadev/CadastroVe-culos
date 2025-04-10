# Projeto Veículos API  
> Projeto para teste prático técnico – cadastro e gerenciamento de veículos via API REST com Node.js

---

## 📁 Estrutura de Pastas

```
backend_cadastro/
├── data/
│   ├── veiculos.json
│   └── id_counter.json
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
```

---

## ✅ Requisitos

- Node.js `^v22.8.0`
- Mocha `^11.1.0`
- Chai `^4.3.4`
- Express `^5.1.0`

---

## ⚙️ Instalação

1. Clone o repositório:

```
git clone https://github.com/eduardorochadev/cadastro-api
cd backend_cadastro
```

2. Instale as dependências:

```
npm install
```

---

## ▶️ Como Executar

Inicie a aplicação com:

```
npm start
```

A aplicação estará disponível em:

```
http://localhost:3000
```

---

## 🧪 Executar os Testes

Antes de rodar os testes, pare o servidor se estiver rodando.

```
npm test
```

Os testes cobrem os principais endpoints da aplicação.

---

## 🔗 Endpoints Disponíveis

| Verbo  | Rota               | Descrição                          |
|--------|--------------------|------------------------------------|
| GET    | `/veiculos`        | Retorna todos os veículos          |
| POST   | `/veiculos`        | Cria um novo veículo               |
| GET    | `/veiculos/:id`    | Retorna um veículo por ID          |
| PUT    | `/veiculos/:id`    | Atualiza os dados de um veículo    |
| DELETE | `/veiculos/:id`    | Remove um veículo existente        |

---


## 🧾 Observações

- Banco de dados simulado com arquivos JSON
- Projeto sem dependência de banco relacional

## ✍️ Autor

**Eduardo Macedo**  
Desenvolvedor Full Stack | entusiasta automotivo  
[LinkedIn](https://www.linkedin.com/in/eduardomacedor/) • [GitHub](https://github.com/eduardorochadev)
