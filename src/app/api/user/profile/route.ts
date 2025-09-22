import authMiddleware from "@/lib/authMiddleware";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const middlewareResult = await authMiddleware(request);

  if (middlewareResult instanceof NextResponse) {
    return middlewareResult;
  }

  const { decodePayload } = middlewareResult;

  return NextResponse.json(
    {
      message: "Dados do perfil do utilizador obtidos com sucesso.",
      user: {
        id: decodePayload.userId,
        email: decodePayload.email,
      },
    },
    { status: 200 }
  );
}
