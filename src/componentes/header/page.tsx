"use client";

import Link from "next/link";
import AuthButtons from "./authButtons";

export default function Header() {

  return (
    <header className="flex items-center bg-white shadow-md w-full h-18 py-5 px-5 md:px-15">
      <nav className="flex justify-between w-full">
        <div className="flex items-center shrink-0">
          <Link className="text-2xl font-bold text-gray-800" href={"/"}>
            Dev<span className="text-indigo-600">Jobs</span>
          </Link>
        </div>
        <div className="flex items-center">
          <ul className="flex gap-8 items-center">
            <Link
              className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 p-2 rounded-md text-sm font-medium"
              href={"/"}
            >
              Vagas
            </Link>
            <AuthButtons/>
          </ul>
        </div>
      </nav>
    </header>
  );
}
