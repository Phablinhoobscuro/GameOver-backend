-- CreateEnum
CREATE TYPE "StatusJogo" AS ENUM ('BACKLOG', 'JOGANDO', 'FINALIZADO', 'ABANDONADO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JogoUsuario" (
    "id" SERIAL NOT NULL,
    "rawgId" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "capaUrl" TEXT,
    "status" "StatusJogo" NOT NULL DEFAULT 'BACKLOG',
    "nota" INTEGER,
    "comentario" TEXT,
    "horasJogadas" INTEGER,
    "favorito" BOOLEAN NOT NULL DEFAULT false,
    "usuarioId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JogoUsuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "JogoUsuario" ADD CONSTRAINT "JogoUsuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
