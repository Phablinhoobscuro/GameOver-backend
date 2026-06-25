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

    return response.data
}

module.exports = {
    buscarJogos,
    buscarDetalhesJogo
}