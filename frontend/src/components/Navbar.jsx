import React from "react";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-base-100 shadow-lg rounded-b-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <span className="text-base-100 font-bold text-sm animate-pulse">
              TR
            </span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
            Thinker
          </h1>
        </div>
        <nav>
          <Link
            to="/create"
            className="btn btn-primary rounded-full px-6 py-3 font-semibold text-black shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105 flex items-center gap-2"
          >
            <PlusIcon size={15} className="stroke-4 text-black" />
            Create
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
