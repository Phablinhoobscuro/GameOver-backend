# GameOver API 🎮

API REST desenvolvida para o projeto **GameOver**, uma plataforma de gerenciamento de backlog de jogos, permitindo que usuários organizem os títulos que desejam jogar, estão jogando, finalizaram ou abandonaram.

## Tecnologias Utilizadas

* Node.js
* Express
* PostgreSQL
* Prisma ORM
* Swagger (OpenAPI)
* JWT
* BCrypt
* CORS
* Dotenv

---

## Objetivo do Projeto

O GameOver tem como objetivo permitir que usuários criem sua própria biblioteca de jogos, podendo:

* Pesquisar jogos através da API RAWG;
* Adicionar jogos à biblioteca pessoal;
* Organizar jogos por status;
* Avaliar jogos com notas;
* Registrar comentários;
* Informar horas jogadas;
* Favoritar títulos.

---

## Estrutura Atual do Projeto

```text
gameover-backend/

├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── config/
│   │   ├── prisma.js
│   │   └── swagger.js
│   │
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── gameRoutes.js
│   │
│   ├── services/
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

## Banco de Dados

O banco de dados foi modelado utilizando PostgreSQL e Prisma ORM.

### Entidade Usuario

| Campo     | Tipo     |
| --------- | -------- |
| id        | Int      |
| nome      | String   |
| email     | String   |
| senha     | String   |
| createdAt | DateTime |
| updatedAt | DateTime |

### Entidade JogoUsuario

| Campo        | Tipo    |
| ------------ | ------- |
| id           | Int     |
| rawgId       | Int     |
| titulo       | String  |
| capaUrl      | String  |
| status       | Enum    |
| nota         | Int     |
| comentario   | String  |
| horasJogadas | Int     |
| favorito     | Boolean |
| usuarioId    | Int     |

### Enum StatusJogo

* BACKLOG
* JOGANDO
* FINALIZADO
* ABANDONADO

---

## Migrações

A primeira migração foi criada e aplicada com sucesso utilizando Prisma Migrate.

```bash
npx prisma migrate dev --name init
```

---

## Rotas Disponíveis

### Auth

#### GET /auth/test

Endpoint de teste para validação da rota de autenticação.

Resposta:

```json
{
  "message": "Auth funcionando"
}
```

---

### Games

#### GET /games/test

Endpoint de teste para validação da rota de jogos.

Resposta:

```json
{
  "message": "Games funcionando"
}
```

---

## Documentação Swagger

A documentação da API está disponível em:

```text
http://localhost:3000/api-docs
```

Atualmente contém os endpoints de teste das rotas Auth e Games.

---

## Como Executar

### Instalar dependências

```bash
npm install
```

### Configurar variáveis de ambiente

Arquivo `.env`

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/gameover"
JWT_SECRET="gameover_secret"
PORT=3000
```

### Executar a aplicação

```bash
npm run dev
```

---

## Próximas Implementações

### Autenticação

* Cadastro de usuário
* Login
* JWT
* Hash de senha com BCrypt

### Biblioteca de Jogos

* Adicionar jogo à biblioteca
* Atualizar status
* Avaliar jogos
* Favoritar jogos
* Remover jogos

### Integração Externa

* Consumo da API RAWG
* Pesquisa de jogos
* Exibição de detalhes

---

## Status do Projeto

🚧 Em desenvolvimento

Fase atual: configuração da infraestrutura do backend, banco de dados e documentação da API.
