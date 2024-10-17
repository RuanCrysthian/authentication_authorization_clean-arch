# Autenticação e Autorização com NodeJs

![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
)

Este projeto busca aplicar os conceitos de Autenticação e Autorização usando Clean Architecture.

# Funcionalidades
- Cadastro de usuários com papel de admin e user.
- Login de usuário e geração de token JWT.
- Encontrar usuário por id.
- Listar todos os usuários.
- Atualizar usuário.
- Deletar usuário.
- Envio de email ao criar um usuário.
- Testes automatizados com 100% de cobertura.

# Tecnologias
- Typescript
- Node
- Express
- Jest
- MySQL
- Docker
- Docker compose
- Clean Architecture

# Pré Requisitos
- Docker
- Docker compose

# Configuração e Execução
1. Clone o repositório

```
git clone https://github.com/RuanCrysthian/authentication_authorization_clean-arch.git
```

2. Configure sua variáveis de ambiente
   1. Na raiz do projeto crie o arquivo `.env` e preencha o seus valores
```
JWT_SECRET=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=
MAILHOG_HOST=
MAILHOG_PORT=
```

3. Suba os containers 
```
docker compose up -d
```

# Endpoints
- **POST**: `http://localhost:4000/signup`: registrar um usuário. 
- **POST**: `http://localhost:4000/login`: login do usuário e geração do token.
- **GET**: `http://localhost:4000/test/admin`: endpoint que só admin pode fazer requisição.
- **GET**: `http://localhost:4000/test/user`: endpoint que só user pode fazer requisição.
- **GET**: `http://localhost:4000/test/all`: endpoint que admin e user podem fazer requisição.
- **POST**: `http://localhost:4000/users`: criar usuário.
- **GET**: `http://localhost:4000/users`: listar todos usuários.
- **GET**: `http://localhost:4000/users/:id`: encontrar usuário por id.
- **UPDATE**: `http://localhost:4000/users/:id`: atualizar usuário
- **DELETE**: `http://localhost:4000/users/:id`: deletar usuário