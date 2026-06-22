const express = require('express')

const router = express.Router()

/**
 * @swagger
 * /games/test:
 *   get:
 *     summary: Teste da rota de jogos
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: Rota funcionando
 */
router.get('/test', (req, res) => {
    res.json({
        message: 'Games funcionando'
    })
})

module.exports = router