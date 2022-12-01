import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full fixed top-0 left-0 shadow-xl">
      <div className="max-w-[1240px] h-20 m-auto flex justify-center items-center">
        <div className="mr-auto">
          <h1>The Crammed Mox</h1>
        </div>
        <div className="flex justify-center items-center">
          <Link href="/">
            <p className="cursor-pointer p-2">Search</p>
          </Link>
          <Link href="/">
            <p className="cursor-pointer p-2">Deck Check</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
