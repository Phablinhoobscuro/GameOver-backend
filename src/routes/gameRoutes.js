const express = require('express')
const router = express.Router()

const autenticar =
    require('../middlewares/authMiddleware')

const gameController =
    require('../controllers/gameController')

/**
 * @swagger
 * /games/discover:
 *   get:
 *     summary: Descobrir jogos populares
 *     description: Retorna uma lista paginada de jogos populares da API RAWG.
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Página desejada
 *     responses:
 *       200:
 *         description: Jogos encontrados com sucesso
 *       401:
 *         description: Não autorizado
 */
    router.get(
    '/discover',
    gameController.descobrirJogos
)
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
 *     description: Retorna todos os jogos cadastrados pelo usuário autenticado. É possível filtrar por status, pesquisar pelo título e definir a ordenação dos resultados.
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - BACKLOG
 *             - JOGANDO
 *             - FINALIZADO
 *             - ABANDONADO
 *         description: Filtrar jogos por status
 *
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *         description: Buscar jogos pelo título (busca parcial, não diferencia maiúsculas/minúsculas)
 *         example: zelda
 *
 *       - in: query
 *         name: sort
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - recent
 *             - oldest
 *             - title
 *             - rating
 *             - favorites
 *         description: Ordenação dos resultados
 *         example: rating
 *
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
 *                     example: https://media.rawg.io/media/games/884/imagem.jpg
 *                   status:
 *                     type: string
 *                     enum:
 *                       - BACKLOG
 *                       - JOGANDO
 *                       - FINALIZADO
 *                       - ABANDONADO
 *                     example: BACKLOG
 *                   nota:
 *                     type: number
 *                     format: float
 *                     example: 4.5
 *                   comentario:
 *                     type: string
 *                     example: Excelente jogo
 *                   horasJogadas:
 *                     type: integer
 *                     example: 80
 *                   favorito:
 *                     type: boolean
 *                     example: true
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2026-06-25T10:30:00.000Z
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2026-06-25T12:15:00.000Z
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
 * /games/rawg/{rawgId}:
 *   get:
 *     summary: Buscar detalhes de um jogo na RAWG
 *     description: Retorna detalhes completos de um jogo da API RAWG pelo ID.
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rawgId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do jogo na RAWG
 *         example: 3498
 *     responses:
 *       200:
 *         description: Detalhes do jogo retornados com sucesso
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro ao buscar detalhes do jogo
 */
router.get(
    '/rawg/:rawgId',
    autenticar,
    gameController.buscarDetalhesRawg
)
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
 *       400:
 *         description: Status inválido
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Jogo não encontrado
 */
router.patch(
    '/:id/status',
    autenticar,
    gameController.atualizarStatus
)
/**
 * @swagger
 * /games/{id}/review:
 *   patch:
 *     summary: Avaliar um jogo da biblioteca
 *     description: Permite registrar ou atualizar a nota e comentário de um jogo pertencente ao usuário autenticado.
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do jogo na biblioteca do usuário
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nota
 *             properties:
 *               nota:
 *                 type: number
 *                 format: float
 *                 minimum: 0
 *                 maximum: 5
 *                 example: 4.5
 *                 description: Nota atribuída ao jogo
 *               comentario:
 *                 type: string
 *                 example: Um dos melhores jogos que já joguei.
 *                 description: Comentário ou opinião do usuário sobre o jogo
 *     responses:
 *       200:
 *         description: Avaliação salva com sucesso
 *       400:
 *         description: Nota inválida
 *       401:
 *         description: Usuário não autenticado
 *       404:
 *         description: Jogo não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.patch(
    '/:id/review',
    autenticar,
    gameController.avaliarJogo
)

/**
 * @swagger
 * /games/{id}/favorite:
 *   patch:
 *     summary: Favoritar ou desfavoritar um jogo
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
 *             required:
 *               - favorito
 *             properties:
 *               favorito:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Favorito atualizado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Jogo não encontrado
 */
router.patch(
    '/:id/favorite',
    autenticar,
    gameController.atualizarFavorito
)

/**
 * @swagger
 * /games/{id}/hours:
 *   patch:
 *     summary: Atualizar horas jogadas
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
 *             required:
 *               - horasJogadas
 *             properties:
 *               horasJogadas:
 *                 type: integer
 *                 minimum: 0
 *                 example: 120
 *                 description: Total de horas jogadas pelo usuário
 *     responses:
 *       200:
 *         description: Horas jogadas atualizadas com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Jogo não encontrado
 */
router.patch(
    '/:id/hours',
    autenticar,
    gameController.atualizarHorasJogadas
)

/**
 * @swagger
 * /games/{id}:
 *   delete:
 *     summary: Remover jogo da biblioteca
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Jogo removido com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Jogo não encontrado
 */
router.delete(
    '/:id',
    autenticar,
    gameController.removerJogo
)

module.exports = router