"use client"

import FormCreat from "@/componentes/ui/formCreat";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

export default function CreateVaga() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section>
        <Link
          href={"/dashboard"}
          className="flex items-center gap-3 mb-6 text-indigo-600 hover:text-indigo-800 font-medium"
        >
          <BsArrowLeft />
          Voltar para o dashboard
        </Link>
      </section>
      <section className="flex flex-col gap-7 bg-white rounded-lg shadow-lg p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Cadastrar Nova Vaga
        </h1>
        <FormCreat />
      </section>
    </div>
  );
}
