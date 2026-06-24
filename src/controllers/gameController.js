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

        const resultado =
            await gameService.atualizarStatus(
                req.params.id,
                req.usuarioId,
                status
            )

        if (resultado.count === 0) {

            return res.status(404).json({
                error: 'Jogo não encontrado'
            })
        }

        return res.json({
            message: 'Status atualizado'
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            error: 'Erro ao atualizar status'
        })
    }
}


module.exports = {
    buscarJogos,
    adicionarJogo,
    listarBiblioteca,
    atualizarStatus
}