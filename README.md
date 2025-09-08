# Desafio A3Data

Este repositório contém dois projetos principais: o backend (NestJS) e o frontend (React + Vite), além de um ambiente Docker para facilitar a execução e o desenvolvimento.

## Estrutura do Projeto

```
├── backend/    # API NestJS (Node.js)
├── frontend/   # Aplicação React (Vite)
├── docker-compose.yml
└── README.md   # (este arquivo)
```

---

## 🐳 Execução com Docker Compose

A maneira mais fácil de rodar todo o sistema é usando Docker Compose. Certifique-se de ter o Docker e o Docker Compose instalados.

```bash
docker-compose up --build
```

- O backend estará disponível em: http://localhost:3000
- O frontend estará disponível em: http://localhost:5173

---

## 📦 Backend (NestJS)

- Local: `backend/`
- Tecnologias: NestJS, TypeORM, JWT, PostgreSQL

### Comandos principais

```bash
cd backend
npm install
npm run start:dev
```

### Variáveis de ambiente
Crie um arquivo `.env` em `backend/` com:
```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=a3data
JWT_SECRET=sua_chave_secreta
```

### Endpoints principais
- `POST /auth/login` — Login
- `POST /auth/signup` — Cadastro
- `GET /revenue-cycle` — Listagem de ciclos (autenticado)

### 📚 Documentação Swagger
Após iniciar o backend, acesse a documentação interativa da API em:

- http://localhost:3000/api

---

## 💻 Frontend (React + Vite)

- Local: `frontend/`
- Tecnologias: React, Vite, Ant Design

### Comandos principais

```bash
cd frontend
npm install
npm run dev
```

### Variáveis de ambiente
Crie um arquivo `.env` em `frontend/` com:
```
VITE_API_URL=http://localhost:3000
```

### Funcionalidades
- Login e cadastro de usuários
- Listagem e cadastro de ciclos de receita
- Controle de sessão e autenticação JWT

---

## 🧪 Testes

### Backend
```bash
cd backend
npm run test
```

### Frontend
Os testes podem ser adicionados conforme a necessidade do projeto.

---

## 📄 Observações
- O sistema depende de um banco PostgreSQL (já configurado no Docker Compose).
- Para ambiente local, ajuste as variáveis de ambiente conforme necessário.

---

## 👨‍💻 Autor
Desafio técnico A3Data
