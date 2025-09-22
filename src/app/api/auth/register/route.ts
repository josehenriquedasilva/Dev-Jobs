import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface registerRequestBody {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  const { email, password } = (await request.json()) as registerRequestBody;

  if (!email || !password) {
    return NextResponse.json(
      { message: "Todos os campos são obrigatorios" },
      { status: 400 }
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
      },
    });

    return NextResponse.json(
      { message: "Registro bem-sucedido!", user: newUser },
      { status: 201 }
    );
  } catch (err) {
    console.error("Erro ao criar usuário", err);
    return NextResponse.json(
      { message: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
