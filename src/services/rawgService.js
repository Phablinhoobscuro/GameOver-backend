const axios = require('axios')

async function buscarJogos(nome) {

    const response = await axios.get(
        'https://api.rawg.io/api/games',
        {
            params: {
                key: process.env.RAWG_API_KEY,
                search: nome,
                page_size: 10
            }
        }
    )

    return response.data.results
}

module.exports = {
    buscarJogos
}