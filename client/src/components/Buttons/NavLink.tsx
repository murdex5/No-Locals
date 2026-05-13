import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface NavLinkProps {
  to: string;
  children: ReactNode;
  className: string;
}

const NavLink = ({ to, className, children }: NavLinkProps) => {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
};

export default NavLink;
