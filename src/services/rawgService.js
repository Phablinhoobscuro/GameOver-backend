const axios = require('axios')

const API_KEY = process.env.RAWG_API_KEY

async function buscarJogos(nome) {

    const response = await axios.get(
        'https://api.rawg.io/api/games',
        {
            params: {
                key: API_KEY,
                search: nome,
                page_size: 10
            }
        }
    )

    return response.data.results
}

async function buscarDetalhesJogo(rawgId) {

    const response = await axios.get(
        `https://api.rawg.io/api/games/${rawgId}`,
        {
            params: {
                key: API_KEY
            }
        }
    )

    const jogo = response.data

    return {
        rawgId: jogo.id,
        titulo: jogo.name,
        nota: jogo.rating,
        lancamento: jogo.released,
        capa: jogo.background_image,
        descricao: jogo.description_raw,
        plataformas: jogo.platforms?.map(item => item.platform.name) || [],
        generos: jogo.genres?.map(item => item.name) || []
    }
}
async function descobrirJogos(page = 1) {

    const response = await axios.get(
        'https://api.rawg.io/api/games',
        {
            params: {
                key: process.env.RAWG_API_KEY,
                page,
                page_size: 40
            }
        }
    )

    return {
        page,

        pageSize: 40,

        total: response.data.count,

        next: !!response.data.next,

        previous: !!response.data.previous,

        jogos: response.data.results.map(jogo => ({
            rawgId: jogo.id,
            titulo: jogo.name,
            nota: jogo.rating,
            lancamento: jogo.released,
            capa: jogo.background_image
        }))
    }
}

module.exports = {
    buscarJogos,
    buscarDetalhesJogo,
    descobrirJogos
}