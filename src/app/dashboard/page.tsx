"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { MdOutlineAddCircleOutline } from "react-icons/md";

interface Vagas {
  id: string;
  titulo: string;
  empresa: string;
  localizacao: string;
}

interface VagasResponse {
  vagas: Vagas[];
}

export default function Dashboard() {
  const [vagas, setVagas] = useState<Vagas[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    fetchVagas();
  }, []);

  const fetchVagas = async () => {
    setLoading(true);
    setErro("");

    try {
      const response = await fetch("/api/user/vagasUser");

      if (!response) {
        throw new Error("Erro ao buscar vagas.");
      }

      const { vagas } = (await response.json()) as VagasResponse;
      setVagas(vagas);
    } catch (err) {
      console.error(err);
      setErro("Erro ao carregar vagas");
    } finally {
      setLoading(false);
    }
  };

  const deleteVaga = async (vagaId: string) => {
    setErro("");

    try {
      const response = await fetch(`/api/user/functionsVaga/deleteVaga/${vagaId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar vaga");
      }

      fetchVagas();
    } catch (err) {
      if (err instanceof Error) {
        setErro(err.message);
      } else {
        setErro("Erro no servidor ao deletar vaga.");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mr-3 md:mr-0">
          Meu Dashboard
        </h1>
        <Link
          href={"/dashboard/createVaga"}
          className="flex-none bg-indigo-600 text-sm text-white px-2 md:px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center gap-2"
        >
          <MdOutlineAddCircleOutline className="size-5" /> Cadastrar nova vaga
        </Link>
      </div>

      {erro ? (
        <div className="container flex justify-center shadow-md bg-white rounded-lg">
          <p className="text-red-500 font-bold">Erro ao buscas vagas: {erro}</p>
        </div>
      ) : (
        ""
      )}

      {loading ? (
        <div className="flex items-center justify-center gap-3">
          <svg className="animate-spin rounded-full size-5 border-t-4 border-black border-solid"></svg>
          <p>Carregando suas vagas...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            {vagas.length === 0 ? (
              <div className="overflow-x-auto h-32 flex justify-center items-center">
                <p className="font-bold text-gray-500">
                  Nenhuma vaga cadastrada.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden sm:rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 divide-y sm:divide-y-0 divide-gray-200 p-4">
                  {vagas.map((vaga) => (
                    <div
                      key={vaga.id}
                      className="p-4 bg-gray-50 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition-shadow duration-200 hover:shadow-md"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-base font-medium text-gray-900 truncate">
                          {vaga.titulo}
                        </div>
                        <div className="text-sm text-gray-500">
                          {vaga.empresa} - {vaga.localizacao}
                        </div>
                      </div>
                      <div className="flex-shrink-0 flex items-center space-x-3">
                        <Link
                          href={`/dashboard/updateVaga/${vaga.id}`}
                          className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                        >
                          <FaRegEdit className="h-5 w-5 mr-1" />
                        </Link>
                        <button
                          onClick={() => deleteVaga(vaga.id)}
                          className="text-red-600 hover:text-red-900 inline-flex items-center cursor-pointer"
                        >
                          <FiTrash className="h-5 w-5 mr-1" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
