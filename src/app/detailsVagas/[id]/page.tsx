"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";

interface ParamsVaga {
  params: {
    id: string;
  };
}

interface VagaDetails {
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

export default function DetailsVaga({ params }: ParamsVaga) {
  const [vaga, setVaga] = useState<VagaDetails | null>(null);
  const [aplicar, setaplicar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      setErro("");

      try {
        const response = await fetch(`/api/vagas/detailsVaga/${params.id}`);

        if (!response.ok) {
          throw new Error("Erro ao buscar essa vaga em especifico.");
        }

        const data = await response.json();
        setVaga(data);
      } catch (err) {
        if (err instanceof Error) {
          setErro(err.message);
        } else {
          setErro("Erro ao buscar vaga");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [params.id]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {erro ? (
        <div className="container flex justify-center mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-red-500 font-bold">{erro}</p>
        </div>
      ) : (
        ""
      )}

      {loading ? (
        <div className="flex justify-center gap-3 mx-20 my-60">
          <svg className="animate-spin rounded-full size-5 border-t-4 border-black border-solid"></svg>
          <p>Carregando vaga...</p>
        </div>
      ) : (
        <div>
          <section>
            <Link
              href={"/"}
              className="flex items-center gap-3 mb-6 text-indigo-600 hover:text-indigo-800 font-medium"
            >
              <BsArrowLeft />
              Voltar para as vagas
            </Link>
          </section>
          <section className="flex flex-col gap-7 bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {vaga?.titulo}
                  </h1>
                  <h2 className="text-xl text-gray-600 mt-1">
                    {vaga?.empresa}
                  </h2>
                </div>
                <span className="font-semibold ml-3 bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                  {vaga?.atuacao}/{vaga?.tipoDeContrato}
                </span>
              </div>
              <p className="flex items-center mt-3 gap-2 text-gray-500">
                <CiLocationOn />
                {vaga?.localizacao}
              </p>
              <section className="mt-4 flex flex-wrap gap-2">
                <p className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                  {vaga?.stacks}
                </p>
              </section>
              <section className="mt-3">
                <p className="text-gray-700 font-semibold">
                  Media de remuneração: R$ {vaga?.salario}
                </p>
              </section>
            </div>
            <hr />
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Descrição da Vaga
              </h3>
              <p className="text-gray-500">{vaga?.descricao}</p>
              <h4 className="my-3 text-lg font-bold text-gray-600">
                Responsabilidades
              </h4>
              <p className="text-gray-500">{vaga?.responsabilidades}</p>
              <button
                onClick={() => setaplicar(true)}
                className="mt-8 w-full sm:w-auto bg-indigo-600 text-white px-6 cursor-pointer py-3 rounded-md hover:bg-indigo-700 font-bold text-lg"
              >
                {aplicar ? "enviado" : "Aplicar para essa vaga"}
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
