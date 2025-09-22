-- CreateEnum
CREATE TYPE "public"."ModalidadeDeAtuacao" AS ENUM ('PRECENSIAL', 'REMOTO', 'HIBRIDO');

-- CreateEnum
CREATE TYPE "public"."TipoDeContrato" AS ENUM ('PJ', 'CLT');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdeAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."vagas" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "atuacao" "public"."ModalidadeDeAtuacao" NOT NULL,
    "empresa" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "tipoDeContrato" "public"."TipoDeContrato" NOT NULL,
    "salario" INTEGER,
    "stacks" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "responsabilidades" TEXT NOT NULL,
    "dataPublicacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "vagas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- AddForeignKey
ALTER TABLE "public"."vagas" ADD CONSTRAINT "vagas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
