const express = require('express')
const router = express.Router()
const autenticar =
    require('../middlewares/authMiddleware')

const authController =
    require('../controllers/authController')

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Cadastrar usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
router.post(
    '/register',
    authController.register
)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realizar login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 */
router.post(
    '/login',
    authController.login
)
/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Retorna usuário autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário autenticado
 */
router.get(
    '/me',
    autenticar,
    authController.me
)

module.exports = router