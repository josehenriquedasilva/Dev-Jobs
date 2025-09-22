"use client";

import VagaDetails from "@/types/vagaDetails";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ParamsVaga {
  params: {
    id: string;
  };
}

export default function FormUpdade({ params }: ParamsVaga) {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const route = useRouter();

  const [titulo, setTitulo] = useState("");
  const [atuacao, setAtuacao] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [tipoDeContrato, setTipoDeContrato] = useState("");
  const [stacks, setStacks] = useState("");
  const [salario, setSalario] = useState("");
  const [descricao, setDescricao] = useState("");
  const [responsabilidades, setResponsabilidades] = useState("");

  useEffect(() => {
    const fetchVaga = async () => {
      setLoading(true);
      setErro("");

      try {
        const response = await fetch(`/api/user/functionsVaga/detailsVaga/${params.id}`);

        if (!response.ok) {
          throw new Error("Erro ao acessar vaga");
        }

        const VagaData = await response.json();
        setTitulo(VagaData.titulo);
        setAtuacao(VagaData.atuacao);
        setEmpresa(VagaData.empresa);
        setLocalizacao(VagaData.localizacao);
        setTipoDeContrato(VagaData.tipoDeContrato);
        setStacks(VagaData.stacks);
        setSalario(VagaData.salario);
        setDescricao(VagaData.descricao);
        setResponsabilidades(VagaData.responsabilidades);
      } catch (err) {
        if (err instanceof Error) {
          setErro(err.message);
        } else {
          setErro("Erro ao buscar dados da vaga.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchVaga();
  }, [params.id]);

  const updateVaga = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro("");

    try {
      const response = await fetch(`/api/user/functionsVaga/updateVaga/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({
          titulo,
          atuacao,
          empresa,
          localizacao,
          tipoDeContrato,
          stacks,
          salario: Number(salario),
          descricao,
          responsabilidades,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar informações");
      }

      route.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setErro(err.message);
      } else {
        setErro("Erro ao atualizar vaga.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {loading ? (
        <div className="flex items-center justify-center gap-3">
          <svg className="animate-spin rounded-full size-5 border-t-4 border-black border-solid"></svg>
          <p>Buscando dados da vaga...</p>
        </div>
      ) : (
        <form onSubmit={updateVaga} className="flex flex-col space-y-6">
          <label
            htmlFor="titulo"
            className="block text-sm font-medium text-gray-700"
          >
            Título da Vaga
          </label>
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            type="text"
            id="titulo"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />

          <label
            htmlFor="atuacao"
            className="block text-sm font-medium text-gray-700"
          >
            Atuação
          </label>
          <select
            value={atuacao}
            onChange={(e) => setAtuacao(e.target.value)}
            name="atuacao"
            id="atuacao"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Selecione a atuação</option>
            <option value="REMOTO">Remoto</option>
            <option value="PRESENCIAL">Presencial</option>
            <option value="HIBRIDO">Híbrido</option>
          </select>

          <label
            htmlFor="empresa"
            className="block text-sm font-medium text-gray-700"
          >
            Empresa
          </label>
          <input
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            type="text"
            id="empresa"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />

          <label
            htmlFor="localizacao"
            className="block text-sm font-medium text-gray-700"
          >
            Localização
          </label>
          <input
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
            type="text"
            id="localizacao"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />

          <label
            htmlFor="tipoContrato"
            className="block text-sm font-medium text-gray-700"
          >
            Tipo de Contrato
          </label>
          <select
            value={tipoDeContrato}
            onChange={(e) => setTipoDeContrato(e.target.value)}
            name="tipoContrato"
            id="tipoContrato"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Selecione o tipo</option>
            <option value="PJ">PJ</option>
            <option value="CLT">CLT</option>
          </select>

          <label
            htmlFor="stacks"
            className="block text-sm font-medium text-gray-700"
          >
            Stacks (separadas por vírgula)
          </label>
          <input
            value={stacks}
            onChange={(e) => setStacks(e.target.value)}
            type="text"
            id="stacks"
            placeholder=""
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />

          <label
            htmlFor="salario"
            className="block text-sm font-medium text-gray-700"
          >
            Salário
          </label>
          <input
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
            type="number"
            id="salario"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />

          <label
            htmlFor="descricao"
            className="block text-sm font-medium text-gray-700"
          >
            Descrição da Vaga
          </label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            name="descricao"
            id="descricao"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          ></textarea>

          <label
            htmlFor="requisitos"
            className="block text-sm font-medium text-gray-700"
          >
            Responsabilidades
          </label>
          <textarea
            value={responsabilidades}
            onChange={(e) => setResponsabilidades(e.target.value)}
            name="requisitos"
            id="requisitos"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          ></textarea>

          {erro ? (
            <div>
              <p className="text-center text-red-500 font-bold">Erro: {erro}</p>
            </div>
          ) : (
            ""
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 cursor-pointer hover:bg-indigo-800 duration-200 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white"
          >
            {loading ? (
              <div className="flex gap-3">
                <svg className="animate-spin rounded-full size-5 border-t-4 border-white border-solid"></svg>
                <p>Carregando...</p>
              </div>
            ) : (
              "Atualizar vaga"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
