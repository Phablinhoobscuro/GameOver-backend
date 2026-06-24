const express = require('express')
const router = express.Router()

const autenticar =
    require('../middlewares/authMiddleware')

const gameController =
    require('../controllers/gameController')

/**
 * @swagger
 * /games:
 *   post:
 *     summary: Adicionar jogo à biblioteca do usuário
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rawgId
 *               - titulo
 *               - status
 *             properties:
 *               rawgId:
 *                 type: integer
 *                 example: 26824
 *               titulo:
 *                 type: string
 *                 example: The Legend of Zelda Skyward Sword
 *               capaUrl:
 *                 type: string
 *                 example: https://media.rawg.io/media/games/884/imagem.jpg
 *               status:
 *                 type: string
 *                 enum:
 *                   - BACKLOG
 *                   - JOGANDO
 *                   - FINALIZADO
 *                   - ABANDONADO
 *                 example: BACKLOG
 *     responses:
 *       201:
 *         description: Jogo adicionado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.post(
    '/',
    autenticar,
    gameController.adicionarJogo
)
/**
 * @swagger
 * /games/my-library:
 *   get:
 *     summary: Listar biblioteca do usuário autenticado
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Biblioteca retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   rawgId:
 *                     type: integer
 *                     example: 26824
 *                   titulo:
 *                     type: string
 *                     example: The Legend of Zelda Skyward Sword
 *                   capaUrl:
 *                     type: string
 *                   status:
 *                     type: string
 *                     example: BACKLOG
 *                   nota:
 *                     type: integer
 *                     example: 5
 *                   comentario:
 *                     type: string
 *                     example: Excelente jogo
 *                   horasJogadas:
 *                     type: integer
 *                     example: 80
 *                   favorito:
 *                     type: boolean
 *                     example: true
 *       401:
 *         description: Não autorizado
 */
router.get(
    '/my-library',
    autenticar,
    gameController.listarBiblioteca
)

/**
 * @swagger
 * /games/test:
 *   get:
 *     summary: Teste da rota de jogos
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: Games funcionando
 */
router.get('/test', (req, res) => {
    res.json({
        message: 'Games funcionando'
    })
})

/**
 * @swagger
 * /games/search:
 *   get:
 *     summary: Buscar jogos na API RAWG
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: nome
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do jogo
 *     responses:
 *       200:
 *         description: Lista de jogos encontrada
 */
router.get(
    '/search',
    autenticar,
    gameController.buscarJogos
)
/**
 * @swagger
 * /games/{id}/status:
 *   patch:
 *     summary: Atualizar status de um jogo
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - BACKLOG
 *                   - JOGANDO
 *                   - FINALIZADO
 *                   - ABANDONADO
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 */
router.patch(
    '/:id/status',
    autenticar,
    gameController.atualizarStatus
)

module.exports = router