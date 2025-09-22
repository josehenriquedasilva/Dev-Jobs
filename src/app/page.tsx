"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";

interface Vagas {
  id: string;
  titulo: string;
  atuacao: string;
  tipoDeContrato: string;
  empresa: string;
  localizacao: string;
  stacks: string;
}

interface VagasResponse {
  response: Vagas[];
  totalPages: number;
  currentPage: number;
}

export default function Home() {
  const [vagas, setVagas] = useState<Vagas[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [currentPage, SetCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchStacks, setSearchStacks] = useState("");
  const [searchLocalizacao, setSearchLocalizacao] = useState("");

  useEffect(() => {
    fetchVagas(currentPage, searchStacks, searchLocalizacao);
  }, [currentPage]);

  const fetchVagas = async (
    page: number,
    stacks: string,
    localizacao: string
  ) => {
    setLoading(true);
    setErro("");

    try {
      const response = await fetch(
        `/api/vagas/fetchVagas/?page=${page}&stacks=${stacks}&localizacao=${localizacao}`
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar vagas.");
      }

      const data = (await response.json()) as VagasResponse;

      setVagas(data.response);
      setTotalPages(data.totalPages);
    } catch (err) {
      if (err instanceof Error) {
        setErro(err.message);
      } else {
        setErro("Erro desconhecido ao buscar vagas.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      SetCurrentPage(page);
    }
  };

  const handleSearch = () => {
    fetchVagas(1, searchStacks, searchLocalizacao);
  };

  const renderButtons = () => {
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className="px-2 bg-[#9595951A] rounded-sm hover:bg-[#9595955d]"
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="flex flex-col gap-5 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gray-50 p-8 rounded-lg shadow-inner text-center mb-8 border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Encontre a sua próxima vaga dev
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          A plataforma simples e direta para conectar desenvolvedores às
          melhores oportunidades.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4  bg-white p-4 rounded-lg shadow-md sticky z-40 border border-gray-200">
        <input
          type="text"
          placeholder="Filtrar por tecnologia (ex: React)"
          value={searchStacks}
          onChange={(e) => setSearchStacks(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="text"
          placeholder="Filtrar por localização"
          value={searchLocalizacao}
          onChange={(e) => setSearchLocalizacao(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          onClick={handleSearch}
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 font-semibold duration-200 cursor-pointer"
        >
          Buscar
        </button>
      </div>

      {erro ? (
        <div className="mt-10 flex items-center justify-center">
          <p className="font-bold text-lg text-red-500">{erro}</p>
        </div>
      ) : (
        ""
      )}

      {loading ? (
        <div className="flex justify-center gap-3 mx-20 my-60">
          <svg className="animate-spin rounded-full size-5 border-t-4 border-black border-solid"></svg>
          <p>Carregando vagas...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vagas.map((vaga) => (
            <Link
              href={`/detailsVagas/${vaga.id}`}
              key={vaga.id}
              className="flex flex-col justify-between bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 cursor-pointer border border-gray-200"
            >
              <section className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                  {vaga.titulo}
                </h2>
                <p className="text-xs font-semibold ml-3 bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                  {vaga.atuacao}/{vaga.tipoDeContrato}
                </p>
              </section>
              <p className="text-gray-600 mt-1">{vaga.empresa}</p>
              <section className="mt-4 gap-0.5 flex items-center text-sm text-gray-500">
                <CiLocationOn />
                <p>{vaga.localizacao}</p>
              </section>
              <section className="mt-4 flex flex-wrap gap-2">
                <p className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
                  {vaga.stacks}
                </p>
              </section>
            </Link>
          ))}
        </div>
      )}
      <div className="flex justify-center items-center mt-10 gap-5">
        <button
          className="font-bold px-2 bg-[#9595951A] rounded-sm hover:bg-[#9595955d] duration-200"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!vagas.length || currentPage === 1}
        >
          &lt;
        </button>
        {renderButtons()}
        <button
          className="font-bold px-2 bg-[#9595951A] rounded-sm hover:bg-[#9595955d] duration-200"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
