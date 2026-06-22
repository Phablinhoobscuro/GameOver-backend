const jwt = require('jsonwebtoken')

function autenticar(req, res, next) {

    const authHeader =
        req.headers.authorization

    if (!authHeader) {

        return res.status(401).json({
            error: 'Token não informado'
        })
    }

    const [, token] =
        authHeader.split(' ')

    try {

        const payload =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            )

        req.usuarioId = payload.id

        next()

    } catch {

        return res.status(401).json({
            error: 'Token inválido'
        })
    }
}

module.exports = autenticar