const swaggerJsdoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: '3.0.0',

        info: {
            title: 'GameOver API',
            version: '1.0.0',
            description: 'API para gerenciamento de backlog de jogos'
        },

        servers: [
            {
                url: 'http://localhost:3000'
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },

            schemas: {

                Usuario: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        nome: {
                            type: 'string',
                            example: 'Phablo'
                        },
                        email: {
                            type: 'string',
                            example: 'phablo@email.com'
                        }
                    }
                },

                RegisterRequest: {
                    type: 'object',
                    required: [
                        'nome',
                        'email',
                        'senha'
                    ],
                    properties: {
                        nome: {
                            type: 'string',
                            example: 'Phablo'
                        },
                        email: {
                            type: 'string',
                            example: 'phablo@email.com'
                        },
                        senha: {
                            type: 'string',
                            example: '123456'
                        }
                    }
                },

                LoginRequest: {
                    type: 'object',
                    required: [
                        'email',
                        'senha'
                    ],
                    properties: {
                        email: {
                            type: 'string',
                            example: 'phablo@email.com'
                        },
                        senha: {
                            type: 'string',
                            example: '123456'
                        }
                    }
                },

                LoginResponse: {
                    type: 'object',
                    properties: {
                        token: {
                            type: 'string',
                            example: 'jwt_token'
                        }
                    }
                },

                JogoUsuario: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },

                        rawgId: {
                            type: 'integer',
                            example: 26824
                        },

                        titulo: {
                            type: 'string',
                            example: 'The Legend of Zelda: Skyward Sword'
                        },

                        capaUrl: {
                            type: 'string',
                            example: 'https://media.rawg.io/media/games/884/imagem.jpg'
                        },

                        status: {
                            type: 'string',
                            enum: [
                                'BACKLOG',
                                'JOGANDO',
                                'FINALIZADO',
                                'ABANDONADO'
                            ],
                            example: 'BACKLOG'
                        },

                        nota: {
                            type: 'integer',
                            nullable: true,
                            example: 5
                        },

                        comentario: {
                            type: 'string',
                            nullable: true,
                            example: 'Excelente jogo.'
                        },

                        horasJogadas: {
                            type: 'integer',
                            nullable: true,
                            example: 120
                        },

                        favorito: {
                            type: 'boolean',
                            example: true
                        },

                        usuarioId: {
                            type: 'integer',
                            example: 1
                        },

                        createdAt: {
                            type: 'string',
                            format: 'date-time'
                        },

                        updatedAt: {
                            type: 'string',
                            format: 'date-time'
                        }
                    }
                },

                AdicionarJogoRequest: {
                    type: 'object',
                    required: [
                        'rawgId',
                        'titulo',
                        'status'
                    ],
                    properties: {
                        rawgId: {
                            type: 'integer',
                            example: 26824
                        },

                        titulo: {
                            type: 'string',
                            example: 'The Legend of Zelda: Skyward Sword'
                        },

                        capaUrl: {
                            type: 'string',
                            example: 'https://media.rawg.io/media/games/884/imagem.jpg'
                        },

                        status: {
                            type: 'string',
                            enum: [
                                'BACKLOG',
                                'JOGANDO',
                                'FINALIZADO',
                                'ABANDONADO'
                            ],
                            example: 'BACKLOG'
                        }
                    }
                }
            }
        }
    },

    apis: ['./src/routes/*.js']
}

const swaggerSpec = swaggerJsdoc(options)

module.exports = swaggerSpec