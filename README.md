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
* Documentação da API com Swagger;
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
│   │   └── authController.js
│   │
│   ├── middlewares/
│   │   └── authMiddleware.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── gameRoutes.js
│   │
│   ├── services/
│   │   └── authService.js
│   │
│   ├── utils/
│   │   └── jwt.js
│   │
│   └── server.js
│
├── prisma/
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

### Integração com RAWG

* Buscar jogos;
* Exibir detalhes dos jogos;
* Exibir capas e banners;
* Exibir avaliações gerais da comunidade.

### Biblioteca de Jogos

* Adicionar jogo à biblioteca;
* Atualizar status do jogo;
* Remover jogo da biblioteca;
* Favoritar jogos;
* Registrar avaliações;
* Registrar comentários;
* Registrar horas jogadas.

### Funcionalidades Sociais (Futuro)

* Perfil público;
* Compartilhamento de avaliações;
* Ranking pessoal de jogos;
* Lista de favoritos.

---

## Status do Projeto

🚧 Em desenvolvimento

### Concluído

✅ Estrutura do backend

✅ PostgreSQL configurado

✅ Prisma ORM configurado

✅ Migrações automáticas

✅ Swagger configurado

✅ Cadastro de usuários

✅ Login de usuários

✅ Criptografia de senhas com BCrypt

✅ JWT

✅ Middleware de autenticação

✅ Endpoint protegido `/auth/me`

✅ Integração do Swagger com Bearer Token

### Próxima etapa

🔄 Integração com a API RAWG

🔄 Busca de jogos em tempo real

🔄 Biblioteca pessoal do usuário
