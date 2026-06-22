const express = require('express')

const router = express.Router()

/**
 * @swagger
 * /auth/test:
 *   get:
 *     summary: Teste da rota de autenticação
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Rota funcionando
 */
router.get('/test', (req, res) => {
    res.json({
        message: 'Auth funcionando'
    })
})

module.exports = router