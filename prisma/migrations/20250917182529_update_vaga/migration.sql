/*
  Warnings:

  - The values [PRESENSIAL] on the enum `ModalidadeDeAtuacao` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."ModalidadeDeAtuacao_new" AS ENUM ('PRESENCIAL', 'REMOTO', 'HIBRIDO');
ALTER TABLE "public"."vagas" ALTER COLUMN "atuacao" TYPE "public"."ModalidadeDeAtuacao_new" USING ("atuacao"::text::"public"."ModalidadeDeAtuacao_new");
ALTER TYPE "public"."ModalidadeDeAtuacao" RENAME TO "ModalidadeDeAtuacao_old";
ALTER TYPE "public"."ModalidadeDeAtuacao_new" RENAME TO "ModalidadeDeAtuacao";
DROP TYPE "public"."ModalidadeDeAtuacao_old";
COMMIT;
