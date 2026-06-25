const prisma = require('../config/prisma')
const rawgService = require('./rawgService')

async function adicionarJogo(usuarioId, dados) {

    return await prisma.jogoUsuario.create({
        data: {
            rawgId: dados.rawgId,
            titulo: dados.titulo,
            capaUrl: dados.capaUrl,
            status: dados.status,
            usuarioId
        }
    })
}
async function listarBiblioteca(
    usuarioId,
    status,
    search,
    sort
) {

    const where = {
        usuarioId
    }

    if (status) {
        where.status = status
    }

    if (search) {
        where.titulo = {
            contains: search,
            mode: 'insensitive'
        }
    }

    let orderBy = {
        createdAt: 'desc'
    }

    switch (sort) {

        case 'oldest':
            orderBy = {
                createdAt: 'asc'
            }
            break

        case 'title':
            orderBy = {
                titulo: 'asc'
            }
            break

        case 'rating':
            orderBy = {
                nota: 'desc'
            }
            break

        case 'favorites':
            orderBy = {
                favorito: 'desc'
            }
            break

        default:
            orderBy = {
                createdAt: 'desc'
            }
    }

    return await prisma.jogoUsuario.findMany({
        where,
        orderBy
    })
}
async function atualizarStatus(
    jogoId,
    usuarioId,
    status
) {

    const statusValidos = [
        'BACKLOG',
        'JOGANDO',
        'FINALIZADO',
        'ABANDONADO'
    ]

    if (!statusValidos.includes(status)) {
        throw new Error('Status inválido')
    }

    const resultado = await prisma.jogoUsuario.updateMany({
        where: {
            id: Number(jogoId),
            usuarioId
        },
        data: {
            status
        }
    })

    if (resultado.count === 0) {
        throw new Error('Jogo não encontrado')
    }

    return resultado
}
async function avaliarJogo(
    jogoId,
    usuarioId,
    nota,
    comentario
) {

    return await prisma.jogoUsuario.updateMany({
        where: {
            id: Number(jogoId),
            usuarioId
        },

        data: {
            nota,
            comentario
        }
    })
}
async function atualizarFavorito(
    jogoId,
    usuarioId,
    favorito
) {

    const resultado = await prisma.jogoUsuario.updateMany({
        where: {
            id: Number(jogoId),
            usuarioId
        },

        data: {
            favorito
        }
    })

    if (resultado.count === 0) {
        throw new Error('Jogo não encontrado')
    }

    return resultado
}
async function atualizarHorasJogadas(
    jogoId,
    usuarioId,
    horasJogadas
) {

    if (horasJogadas < 0) {
        throw new Error('Horas jogadas não pode ser negativa')
    }

    const resultado = await prisma.jogoUsuario.updateMany({
        where: {
            id: Number(jogoId),
            usuarioId
        },

        data: {
            horasJogadas
        }
    })

    if (resultado.count === 0) {
        throw new Error('Jogo não encontrado')
    }

    return resultado
}
async function removerJogo(
    jogoId,
    usuarioId
) {

    const resultado = await prisma.jogoUsuario.deleteMany({
        where: {
            id: Number(jogoId),
            usuarioId
        }
    })

    if (resultado.count === 0) {
        throw new Error('Jogo não encontrado')
    }

    return resultado
}
async function buscarDetalhesRawg(rawgId) {

    if (!rawgId) {
        throw new Error('ID do jogo é obrigatório')
    }

    return await rawgService.buscarDetalhesJogo(rawgId)
}

module.exports = {
    adicionarJogo,
    listarBiblioteca,
    atualizarStatus,
    avaliarJogo,
    atualizarFavorito,
    atualizarHorasJogadas,
    removerJogo,
    buscarDetalhesRawg
}