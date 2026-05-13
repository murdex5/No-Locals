import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface NavLinkProps {
  to: string;
  children: ReactNode;
}

const NavLink = ({ to, children }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className="bg-black text-white px-8 py-3 rounded-full font-bold w-fit hover:bg-gray-800 transition"
    >
      {children}
    </Link>
  );
};

export default NavLink;
