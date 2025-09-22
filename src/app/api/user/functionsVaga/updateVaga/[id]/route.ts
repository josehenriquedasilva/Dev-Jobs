import authMiddleware from "@/lib/authMiddleware";
import { ModalidadeDeAtuacao, Prisma, TipoDeContrato } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface UpdateVaga {
  titulo?: string;
  atuacao?: string;
  tipoDeContrato?: string;
  empresa?: string;
  localizacao?: string;
  stacks?: string;
  salario?: number;
  descricao?: string;
  responsabilidades?: string;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const middlewareResult = await authMiddleware(request);
  if (middlewareResult instanceof NextResponse) {
    return middlewareResult;
  }
  const { decodePayload } = middlewareResult;
  const userId = decodePayload.userId;

  const { id } = params;
  const body = (await request.json()) as UpdateVaga;

  try {
    const vaga = await prisma.vaga.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!vaga || vaga.userId !== userId) {
      return NextResponse.json(
        { message: "Não autorizado a editar esta vaga" },
        { status: 403 }
      );
    }

    const dataUpdate: Prisma.VagaUpdateInput = {};

    if (body.titulo) dataUpdate.titulo = body.titulo;
    if (body.empresa) dataUpdate.empresa = body.empresa;
    if (body.localizacao) dataUpdate.localizacao = body.localizacao;
    if (body.descricao) dataUpdate.descricao = body.descricao;
    if (body.responsabilidades)
      dataUpdate.responsabilidades = body.responsabilidades;
    if (body.stacks) dataUpdate.stacks = body.stacks;
    if (body.salario) dataUpdate.salario = body.salario;

    if (body.atuacao) {
      if (
        !Object.values(ModalidadeDeAtuacao).includes(
          body.atuacao as ModalidadeDeAtuacao
        )
      ) {
        return NextResponse.json(
          { message: "Modalidade de atuação inválida." },
          { status: 400 }
        );
      }
      dataUpdate.atuacao = body.atuacao as ModalidadeDeAtuacao;
    }

    if (body.tipoDeContrato) {
      const tipoDeContratoUpper = body.tipoDeContrato.toUpperCase();
      if (
        !Object.values(TipoDeContrato).includes(
          tipoDeContratoUpper as TipoDeContrato
        )
      ) {
        return NextResponse.json(
          { message: "Tipo de contrato inválido. Use 'CLT' OU 'PJ'." },
          { status: 400 }
        );
      }
      dataUpdate.tipoDeContrato = tipoDeContratoUpper as TipoDeContrato;
    }

    const UpdatedVaga = await prisma.vaga.update({
      where: { id },
      data: dataUpdate,
    });

    return NextResponse.json(
      { message: "Vaga atualizada!", vaga: UpdatedVaga },
      { status: 200 }
    );
  } catch (err) {
    console.error("Erro ao atualizar vaga", err);
    return NextResponse.json(
      { message: "Erro interno so servidor ao atualizar" },
      { status: 500 }
    );
  }
}