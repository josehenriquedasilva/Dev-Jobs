import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import authMiddleware from "@/lib/authMiddleware";

export async function GET(request: NextRequest) {
  try {
    const middlewareResult = await authMiddleware(request);
    if (middlewareResult instanceof NextResponse) {
      return middlewareResult;
    }
    const { decodePayload } = middlewareResult;
    const userId = decodePayload.userId;

    const vagas = await prisma.vaga.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        titulo: true,
        empresa: true,
        localizacao: true,
      },
    });

    return NextResponse.json({ vagas }, { status: 200 });
  } catch (err) {
    console.error("Erro ao obter vagas do usuário", err);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}