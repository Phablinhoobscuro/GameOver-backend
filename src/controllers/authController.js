const authService = require('../services/authService')

async function register(req, res) {

    try {

        const usuario = await authService.register(
            req.body
        )

        return res.status(201).json({
            message: 'Usuário criado com sucesso',
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        })

    } catch (error) {

        return res.status(400).json({
            error: error.message
        })
    }
}

async function login(req, res) {

    try {

        const { email, senha } = req.body

        const resultado =
            await authService.login(
                email,
                senha
            )

        return res.json(resultado)

    } catch (error) {

        return res.status(401).json({
            error: error.message
        })
    }
}

module.exports = {
    register,
    login
}