require('dotenv').config()

const express = require('express')
const cors = require('cors')

const swaggerUi = require('swagger-ui-express')

const swaggerSpec = require('./config/swagger')

const authRoutes = require('./routes/authRoutes')
const gameRoutes = require('./routes/gameRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/games', gameRoutes)

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
)

app.get('/', (req, res) => {
    res.json({
        projeto: 'GameOver API',
        versao: '1.0.0'
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})