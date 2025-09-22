"use client"

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';

export default function AuthButtons() {
  const [userLogged, setUserLogged] = useState(false);
  const router = useRouter();
  const pathname = usePathname()

  const checkStatus = () => {
    const isLogged = localStorage.getItem("isLogged") === 'true';
    setUserLogged(isLogged);
  };

  useEffect(() => {
    checkStatus();

    window.addEventListener("storage", checkStatus);
    
    return () => {
      window.removeEventListener("storage", checkStatus);
    };
  }, [pathname]);

  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem('isLogged')
    setUserLogged(false);
    router.push("/");
  };

  if (userLogged) {
    return (
      <>
        <li>
          <Link
            href={"/dashboard"}
            className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 p-2 rounded-md text-sm font-medium"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <button
            onClick={logout}
            className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 p-2 rounded-md text-sm font-medium cursor-pointer"
          >
            Sair
          </button>
        </li>
      </>
    );
  }

  return (
    <li>
      <Link
        href={"/login"}
        className="bg-indigo-600 text-white p-2 rounded-md text-sm font-medium hover:bg-indigo-700"
      >
        Login/Cadastrar
      </Link>
    </li>
  );
}