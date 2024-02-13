"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";

const Navbar = () => {
  const currentPath = usePathname();
  const links = [
    {
      path: "/",
      name: "Dashboard",
    },
    {
      path: "/issues",
      name: "Issues",
    },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              href={link.path}
              className={classNames({
                "text-gray-900": currentPath === link.path,
                "text-gray-500": currentPath !== link.path,
                "hover:text-zinc-800 transition-colors": true,
              })}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
