import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const vaga = await prisma.vaga.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    if (!vaga) {
      return NextResponse.json(
        { message: "Vaga não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(vaga, { status: 200 });
  } catch (err) {
    console.error("Erro ao obter vaga", err);
    return NextResponse.json(
      { message: "Erro interno ao obter vaga" },
      { status: 500 }
    );
  }
}