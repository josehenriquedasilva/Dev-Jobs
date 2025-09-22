import authMiddleware from "@/lib/authMiddleware";
import { ModalidadeDeAtuacao, TipoDeContrato } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface CreateVaga {
  titulo: string;
  atuacao: string;
  tipoDeContrato: string;
  empresa: string;
  localizacao: string;
  stacks: string;
  salario: string;
  descricao: string;
  responsabilidades: string;
}

export async function POST(request: NextRequest) {
  const middlewareResult = await authMiddleware(request);
  if (middlewareResult instanceof NextResponse) {
    return middlewareResult;
  }
  const { decodePayload } = middlewareResult;
  const userId = decodePayload.userId;

  try {
    const body = (await request.json()) as CreateVaga;
    const {
      titulo,
      atuacao,
      tipoDeContrato,
      empresa,
      localizacao,
      stacks,
      salario,
      descricao,
      responsabilidades,
    } = body;

    if (
      !titulo ||
      !empresa ||
      !localizacao ||
      !descricao ||
      !responsabilidades
    ) {
      return NextResponse.json(
        { message: "Os campos obrigatórios não foram preenchidos" },
        { status: 400 }
      );
    }

    const tipoDeContratoUpper = tipoDeContrato.toUpperCase()
    if (
      !Object.values(TipoDeContrato).includes(tipoDeContratoUpper as TipoDeContrato)
    ) {
      return NextResponse.json(
        {
          message: "Tipo de contrato inválido. Use 'CLT' OU 'PJ'.",
          tipoDeContrato,
        },
        { status: 400 }
      );
    }

    if (
      !Object.values(ModalidadeDeAtuacao).includes(
        atuacao as ModalidadeDeAtuacao
      )
    ) {
      return NextResponse.json(
        { message: "Modalidade de atuação inválida." },
        { status: 400 }
      );
    }

    const salarioInt = parseInt(salario, 10)

    const novaVaga = await prisma.vaga.create({
      data: {
        titulo,
        empresa,
        localizacao,
        descricao,
        responsabilidades,
        user: {
          connect: {
            id: userId,
          },
        },
        tipoDeContrato: tipoDeContrato as TipoDeContrato,
        atuacao: atuacao as ModalidadeDeAtuacao,
        stacks,
        salario: salarioInt
      },
    });

    return NextResponse.json(
      { message: "Vaga criada com sucesso!", vaga: novaVaga },
      { status: 201 }
    );
  } catch (err) {
    console.error("Erro ao criar vaga", err);
    return NextResponse.json(
      { message: "Erro interno no servidor ao criar vaga", err },
      { status: 500 }
    );
  }
}
