# Bitcoin Wallet

<p align="center" width="100%">
    <img width="22%" src="https://www.vectorlogo.zone/logos/nodejs/nodejs-ar21.svg" alt="Node.js Logo">
    <img width="22%" src="https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.svg" alt="Express.js Logo">
</p>

## Descrição

Este é um projeto de backend utilizando Node.js, TypeScript, Express e Sequelize. Ele inclui a configuração inicial do
projeto, modelos básicos e endpoints para manipulação de dados em um banco de dados PostgreSQL.

## Estrutura do Projeto

```
project-root/
├── src/
│   ├── adapters/
│   │   ├── api/
│   │   │   ├── controllers/
│   │   │   ├── middleware/
│   │   │   ├── routes/
│   │   │   ├── swagger/
│   │   │   │   ├── annotation/
│   │   │   │   └── swaggerOptions.ts
│   │   │   ├── utils/
│   │   ├── persistence/
│   │   │   ├── models/
│   │   │   ├── repositories/
│   │   │   └── services/
│   ├── application.usecases/
│   │   ├── auth/
│   │   ├── token/
│   │   └── user/
│   ├── bootstrap/
│   │   ├── app.ts
│   │   ├── database.ts
│   │   └── passport.ts
│   ├── domain/
│   │   ├── entities/
│   │   └── repositories/
│   ├── shared/
│   │   ├── dto/
│   │   ├── errors/
│   │   ├── types/
│   │   └── utils/
│   └── index.ts
├── .env
├── Dockerfile
├── docker-compose.yml
└── ...
```

## Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn (Recomendado v4+, instruções de instalação logo abaixo)
- Banco de dados PostgreSQL
- Docker (apenas para inicialização rápida)
- Docker Compose (apenas para inicialização rápida)

### Instalação do Yarn

Unix/macOS:

```bash
corepack enable && corepack prepare yarn@stable --activate
```

## Inicialização Rápida

Subir o projeto com Docker:

### 1. Clone o repositório e entre na pasta do projeto

```bash
git clone https://github.com/thoggs/btc-wallet-backend-express.git && cd btc-wallet-backend-express
```

### 2. Suba o projeto usando Docker

```bash
docker-compose up -d
```

### 3. Execute as Migrations e Seeders

Dentro da pasta do projeto, execute o comando abaixo para criar as tabelas no banco de dados e popular.

```bash
yarn && npx sequelize-cli db:seed:all
```

### 4. Servidor

> O projeto estará disponível em: http://localhost:8083/api/{endpoint}

### 5. Swagger

> Acesse a documentação Swagger em: http://localhost:8083/api-docs

## Configuração para Desenvolvimento

### 1. Clonar o Repositório

```bash
git clone https://github.com/thoggs/btc-wallet-backend-express.git && cd btc-wallet-backend-express
```

### 2. Instalar Dependências

```bash
npm install
# ou
yarn install
```

### 3. Configurar Variáveis de Ambiente

Crie ou edite o arquivo `.env` na raiz do projeto e adicione suas configurações do banco de dados:

```env
# Application configuration
PORT=3000

# Database configuration
DB_NAME=nome_do_banco
DB_USER=usuario_do_banco
DB_PASS=senha_do_banco
DB_HOST=url_do_banco
DB_PORT=porta_do_banco
DB_DIALECT=banco_de_dados (postgres, mysql e etc..)

# JWT configuration
JWT_SECRET=jwt_senha_secreta
JWT_ISSUER=jwt_issuer
JWT_AUDIENCE=jwt_audience
JWT_EXPIRES_IN=jwt_tempo_de_expiracao
```

### 4. Rodar o Projeto

Para rodar o projeto em modo de desenvolvimento:

```bash
yarn dev
# ou
npm run dev
```

### Servidor

> O projeto estará disponível em: http://localhost:3000/api/{endpoint}

### Swagger

> Acesse a documentação Swagger em: http://localhost:3000/api-docs

## Para rodar o projeto em modo de produção:

### 1. Compile o projeto

```bash
npm run build
# ou
yarn build
```

### 2. Suba o servidor com o Node

```bash
node dist/index.js
```

## Tecnologias Utilizadas

- **Node.js**: Runtime JavaScript
- **TypeScript**: Superconjunto tipado de JavaScript
- **Express**: Framework para Node.js
- **Sequelize**: ORM para Node.js
- **PostgreSQL**: Banco de dados relacional
- **Webpack**: Empacotador de módulos
- **passport-jwt**: Estratégia de autenticação JWT para Passport
- **Bcrypt.js**: Biblioteca para criptografia de senhas
- **Axios**: Cliente HTTP para Node.js
- **Docker**: Plataforma de contêineres

## License

Project license [Apache-2.0](https://opensource.org/license/apache-2-0)
