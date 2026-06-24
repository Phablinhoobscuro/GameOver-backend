const prisma = require('../config/prisma')

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

async function listarBiblioteca(usuarioId) {

    return await prisma.jogoUsuario.findMany({
        where: {
            usuarioId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}
async function atualizarStatus(
    jogoId,
    usuarioId,
    status
) {

    return await prisma.jogoUsuario.updateMany({
        where: {
            id: Number(jogoId),
            usuarioId
        },

        data: {
            status
        }
    })
}


module.exports = {
    adicionarJogo,
    listarBiblioteca,
    atualizarStatus
}