"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const router = useRouter();

  const register = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErro("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Falha ao criar conta");
      }

      router.push("/login");
    } catch (err) {
      console.error("Erro interno no servidor", err);
      setErro("Não é possivel conectar-se ao servidor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-128px)] bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg border border-gray-200">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900">
            Crie uma conta
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ou{" "}
            <Link
              className="font-medium text-indigo-600 hover:text-indigo-500 hover:cursor-pointer"
              href={"/login"}
            >
              faça login
            </Link>
          </p>
          <p className="mt-2 text-center text-sm text-red-500">{erro}</p>
        </div>
        <form onSubmit={register} className="mt-8 space-y-6">
          <div className="flex flex-col gap-3 rounded-md">
            <div>
              <label htmlFor="idEmail" className="sr-only">
                Email
              </label>
              <input
                type="text"
                id="idEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="idPassword"></label>
              <input
                type="password"
                id="idPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? (
                  <svg
                    className="animate-spin rounded-full size-5 border-t-3 border-white border-solid"
                    viewBox="0 0 24 24"
                  ></svg>
                ) : (
                  "Criar conta"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
