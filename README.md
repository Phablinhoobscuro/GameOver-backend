# GameOver API 🎮

API REST desenvolvida para o projeto **GameOver**, uma plataforma para gerenciamento de backlog de jogos, permitindo que usuários organizem os títulos que desejam jogar, estão jogando, finalizaram ou abandonaram.

## Tecnologias Utilizadas

* Node.js
* Express
* PostgreSQL
* Prisma ORM
* Swagger (OpenAPI)
* JWT (JSON Web Token)
* BCrypt
* Axios
* CORS
* Dotenv
* Nodemon

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

## Funcionalidades Implementadas

### Infraestrutura

* Configuração do Express;
* Integração com PostgreSQL;
* ORM Prisma configurado;
* Migrações automáticas com Prisma Migrate;
* Documentação da API com Swagger/OpenAPI;
* Schemas reutilizáveis no Swagger;
* Estrutura organizada em camadas (Routes, Controllers, Services, Middlewares e Config).

### Autenticação

* Cadastro de usuários;
* Login de usuários;
* Criptografia de senhas utilizando BCrypt;
* Geração de tokens JWT;
* Middleware de autenticação;
* Proteção de rotas privadas;
* Endpoint para recuperar os dados do usuário autenticado (`/auth/me`);
* Integração do Swagger com autenticação Bearer Token.

### Integração com RAWG

* Busca de jogos em tempo real;
* Consumo da API RAWG;
* Retorno de nome, capa, nota e data de lançamento;
* Endpoint protegido para pesquisa de jogos.

### Biblioteca de Jogos

* Adição de jogos à biblioteca pessoal;
* Associação automática dos jogos ao usuário autenticado;
* Persistência dos dados em PostgreSQL;
* Listagem da biblioteca do usuário.

---

## Estrutura do Projeto

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
│   │   ├── authController.js
│   │   └── gameController.js
│   │
│   ├── middlewares/
│   │   └── authMiddleware.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── gameRoutes.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── gameService.js
│   │   └── rawgService.js
│   │
│   ├── utils/
│   │   └── jwt.js
│   │
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

## Banco de Dados

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

## Rotas Disponíveis

### Autenticação

#### POST /auth/register

Realiza o cadastro de um novo usuário.

Exemplo:

```json
{
  "nome": "Phablo",
  "email": "phablo@email.com",
  "senha": "123456"
}
```

Resposta:

```json
{
  "message": "Usuário criado com sucesso"
}
```

---

#### POST /auth/login

Realiza autenticação do usuário.

Exemplo:

```json
{
  "email": "phablo@email.com",
  "senha": "123456"
}
```

Resposta:

```json
{
  "token": "jwt_token"
}
```

---

#### GET /auth/me

Retorna os dados do usuário autenticado.

**Requer autenticação JWT.**

Resposta:

```json
{
  "id": 1,
  "nome": "Phablo",
  "email": "phablo@email.com"
}
```

---

### Jogos

#### GET /games/search

Busca jogos na API RAWG.

Parâmetro:

```text
?nome=zelda
```

Exemplo de resposta:

```json
[
  {
    "rawgId": 26824,
    "titulo": "The Legend of Zelda: Skyward Sword",
    "nota": 4.14,
    "lancamento": "2011-11-20",
    "capa": "https://..."
  }
]
```

---

#### POST /games

Adiciona um jogo à biblioteca do usuário autenticado.

Exemplo:

```json
{
  "rawgId": 26824,
  "titulo": "The Legend of Zelda: Skyward Sword",
  "capaUrl": "https://...",
  "status": "BACKLOG"
}
```

---

#### GET /games/my-library

Lista todos os jogos cadastrados pelo usuário autenticado.

Exemplo:

```json
[
  {
    "id": 1,
    "rawgId": 26824,
    "titulo": "The Legend of Zelda: Skyward Sword",
    "status": "BACKLOG",
    "favorito": false
  }
]
```
---

#### PATCH /games/{id}/status

Atualiza o status de um jogo da biblioteca do usuário autenticado.

Exemplo:

```json
{
  "status": "JOGANDO"
}
```

Valores permitidos:

```text
BACKLOG
JOGANDO
FINALIZADO
ABANDONADO
```

Resposta:

```json
{
  "message": "Status atualizado"
}
```

---

#### GET /games/test

Endpoint de teste para validação das rotas de jogos.

Resposta:

```json
{
  "message": "Games funcionando"
}
```

---

## Segurança

A API utiliza autenticação baseada em JWT (JSON Web Token).

Fluxo de autenticação:

1. Realizar login em `/auth/login`;
2. Receber o token JWT;
3. Utilizar o botão **Authorize** disponível no Swagger;
4. Informar o token Bearer;
5. Acessar endpoints protegidos.

---

## Documentação Swagger

A documentação da API está disponível em:

```text
http://localhost:3000/api-docs
```

O Swagger permite:

* Visualizar todos os endpoints;
* Testar requisições diretamente pelo navegador;
* Autenticar utilizando JWT através do botão **Authorize**;
* Utilizar schemas reutilizáveis para Usuários e Jogos;
* Consultar parâmetros e respostas da API.

---

## Como Executar o Projeto

### Instalar dependências

```bash
npm install
```

### Configurar variáveis de ambiente

Arquivo `.env`

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/gameover"
JWT_SECRET="gameover_secret"
RAWG_API_KEY="sua_chave_rawg"
PORT=3000
```

### Executar em modo desenvolvimento

```bash
npm run dev
```

### Executar Prisma Studio

```bash
npx prisma studio
```

---

## Próximas Implementações

### Biblioteca de Jogos

* Adição de jogos à biblioteca pessoal;
* Associação automática dos jogos ao usuário autenticado;
* Persistência dos dados em PostgreSQL;
* Listagem da biblioteca do usuário;
* Atualização do status dos jogos;
* Organização dos jogos por progresso (Backlog, Jogando, Finalizado e Abandonado).

### Integração RAWG

* Buscar detalhes completos dos jogos;
* Buscar plataformas;
* Buscar gêneros;
* Buscar screenshots;
* Buscar banners.

### Funcionalidades Sociais (Futuro)

* Perfil público;
* Compartilhamento de avaliações;
* Ranking pessoal;
* Lista pública de favoritos.

---

## Status do Projeto

🚧 Em desenvolvimento

### Concluído

✅ Estrutura do backend

✅ PostgreSQL configurado

✅ Prisma ORM configurado

✅ Migrações automáticas

✅ Swagger configurado

✅ Schemas reutilizáveis no Swagger

✅ Cadastro de usuários

✅ Login de usuários

✅ Criptografia de senhas com BCrypt

✅ JWT

✅ Middleware de autenticação

✅ Endpoint protegido `/auth/me`

✅ Integração do Swagger com Bearer Token

✅ Integração com a API RAWG

✅ Busca de jogos em tempo real

✅ Adição de jogos à biblioteca

✅ Listagem da biblioteca do usuário

### Próxima etapa

🔄 Atualização de status dos jogos

🔄 Sistema de avaliações

🔄 Favoritos

🔄 Remoção de jogos da biblioteca
