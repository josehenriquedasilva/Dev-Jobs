import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const vagasPage = 6;
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const stacks = url.searchParams.get("stacks") || "";
    const localizacao = url.searchParams.get("localizacao") || "";
    const skip = (page - 1) * vagasPage;

    const where: Prisma.VagaWhereInput = {};

    if (stacks && localizacao) {
      where.AND = [
        { stacks: { contains: stacks, mode: "insensitive" } },
        { localizacao: { contains: localizacao, mode: "insensitive" } },
      ];
    } else if (stacks) {
      where.AND = {
        stacks: { contains: stacks, mode: "insensitive" },
      };
    } else if (localizacao) {
      where.AND = {
        localizacao: { contains: localizacao, mode: "insensitive" },
      };
    }

    const totalVagas = (await prisma.vaga.count({ where })) || 0;
    const totalPages = Math.ceil(totalVagas / vagasPage);

    const response = await prisma?.vaga.findMany({
      skip: skip,
      take: vagasPage,
      where,
      select: {
        id: true,
        titulo: true,
        empresa: true,
        localizacao: true,
        tipoDeContrato: true,
        atuacao: true,
        salario: true,
        descricao: true,
        responsabilidades: true,
        stacks: true,
      },
    });

    return NextResponse.json({ response, totalPages }, { status: 200 });
  } catch (err) {
    console.error("Erro ao obter suas vagas", err);
    return NextResponse.json(
      { message: "Erro interno ao obter vagas" },
      { status: 500 }
    );
  }
}
