const bcrypt = require('bcrypt')
const prisma = require('../config/prisma')
const { gerarToken } = require('../utils/jwt')

async function register(dados) {

    const usuarioExistente = await prisma.usuario.findUnique({
        where: {
            email: dados.email
        }
    })

    if (usuarioExistente) {
        throw new Error('Email já cadastrado')
    }

    const senhaHash = await bcrypt.hash(dados.senha, 10)

    const usuario = await prisma.usuario.create({
        data: {
            nome: dados.nome,
            email: dados.email,
            senha: senhaHash
        }
    })

    return usuario
}

async function login(email, senha) {

    const usuario = await prisma.usuario.findUnique({
        where: {
            email
        }
    })

    if (!usuario) {
        throw new Error('Usuário ou senha inválidos')
    }

    const senhaValida = await bcrypt.compare(
        senha,
        usuario.senha
    )

    if (!senhaValida) {
        throw new Error('Usuário ou senha inválidos')
    }

    const token = gerarToken(usuario)

    return {
        token
    }
}
async function buscarPorId(id) {

    const usuario = await prisma.usuario.findUnique({
        where: {
            id
        }
    })

    if (!usuario) {
        throw new Error('Usuário não encontrado')
    }

    return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
    }
}

module.exports = {
    register,
    login,
    buscarPorId
}