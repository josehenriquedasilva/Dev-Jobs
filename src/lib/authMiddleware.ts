import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export default async function authMiddleware(request: NextRequest) {
  const token = (await cookies()).get("token");

  if (!token) {
    return NextResponse.json(
      { message: "Acesso negado, não autenticado" },
      { status: 401 }
    );
  }

  try {
    const secret = process.env.JWT_SECRET as string;

    const decoded = jwt.verify(token.value, secret) as JwtPayload;

    return {
      status: "success",
      decodePayload: decoded,
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Erro de validação de JWT:", err.message);
      if (err.message === "TokenExpiredError") {
        return NextResponse.json(
          { message: "Sessão expirada, faça login novamente" },
          { status: 401 }
        );
      }
    }
    return NextResponse.json(
      { message: "Token de autenticação inválido." },
      { status: 401 }
    );
  }
}
