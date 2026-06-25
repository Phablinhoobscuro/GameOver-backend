const rawgService = require('../services/rawgService')
const gameService =
    require('../services/gameService')

async function buscarJogos(req, res) {

    try {

        const { nome } = req.query

        if (!nome) {
            return res.status(400).json({
                error: 'Informe o nome do jogo'
            })
        }

        const jogos =
            await rawgService.buscarJogos(nome)

        const resultado = jogos.map(jogo => ({
            rawgId: jogo.id,
            titulo: jogo.name,
            nota: jogo.rating,
            lancamento: jogo.released,
            capa: jogo.background_image
        }))

        return res.json(resultado)

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            error: 'Erro ao buscar jogos na RAWG'
        })
    }
}
async function adicionarJogo(req, res) {

    try {

        const jogo =
            await gameService.adicionarJogo(
                req.usuarioId,
                req.body
            )

        return res.status(201).json(jogo)

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            error: 'Erro ao adicionar jogo'
        })
    }
}
async function listarBiblioteca(req, res) {

    try {

        const jogos =
            await gameService.listarBiblioteca(
                req.usuarioId
            )

        return res.json(jogos)

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            error: 'Erro ao listar biblioteca'
        })
    }
}
async function atualizarStatus(req, res) {

    try {

        const { status } = req.body

        await gameService.atualizarStatus(
            req.params.id,
            req.usuarioId,
            status
        )

        return res.json({
            message: 'Status atualizado com sucesso'
        })

    } catch (error) {

        return res.status(400).json({
            error: error.message
        })
    }
}
async function avaliarJogo(req, res) {

    try {

        const {
            nota,
            comentario
        } = req.body

        if (nota < 0 || nota > 5) {

            return res.status(400).json({
                error: 'A nota deve estar entre 0 e 5'
            })
        }

        const resultado =
            await gameService.avaliarJogo(
                req.params.id,
                req.usuarioId,
                nota,
                comentario
            )

        if (resultado.count === 0) {

            return res.status(404).json({
                error: 'Jogo não encontrado'
            })
        }

        return res.json({
            message: 'Avaliação salva com sucesso'
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            error: 'Erro ao salvar avaliação'
        })
    }
}

async function atualizarFavorito(req, res) {

    try {

        const { favorito } = req.body

        await gameService.atualizarFavorito(
            req.params.id,
            req.usuarioId,
            favorito
        )

        return res.json({
            message: 'Favorito atualizado com sucesso'
        })

    } catch (error) {

        return res.status(400).json({
            error: error.message
        })
    }
}
async function atualizarHorasJogadas(req, res) {

    try {

        const { horasJogadas } = req.body

        await gameService.atualizarHorasJogadas(
            req.params.id,
            req.usuarioId,
            horasJogadas
        )

        return res.json({
            message: 'Horas jogadas atualizadas com sucesso'
        })

    } catch (error) {

        return res.status(400).json({
            error: error.message
        })
    }
}
async function removerJogo(req, res) {

    try {

        await gameService.removerJogo(
            req.params.id,
            req.usuarioId
        )

        return res.json({
            message: 'Jogo removido com sucesso'
        })

    } catch (error) {

        return res.status(400).json({
            error: error.message
        })
    }
}
module.exports = {
    buscarJogos,
    adicionarJogo,
    listarBiblioteca,
    atualizarStatus,
    avaliarJogo,
    atualizarFavorito,
    atualizarHorasJogadas,
    removerJogo
}