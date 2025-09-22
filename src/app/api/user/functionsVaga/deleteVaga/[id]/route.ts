import authMiddleware from "@/lib/authMiddleware";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
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

  try {
    const vaga = await prisma.vaga.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!vaga || vaga.userId !== userId) {
      return NextResponse.json({ message: "Não autorizado!" }, { status: 403 });
    }

    await prisma?.vaga.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Vaga excluida!" }, { status: 200 });
  } catch (err) {
    console.error("Erro ao excluir a vaga", err);
    return NextResponse.json(
      { message: "Erro interno a excluir vaga!", err },
      { status: 500 }
    );
  }
}