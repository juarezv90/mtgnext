import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const [navBG, setNavBG] = useState("white")
  const [textColor, setTextColor] = useState("black");

  const router = useRouter();

  useEffect(() => {
    if(router.asPath === '/DeckCheck'){
      setNavBG("rgba(0 0 0 / .8)")
      setTextColor("white")
    } else {
      setNavBG("white")
      setTextColor("black")
    }

  }, [router])


  return (
    <div style={{backgroundColor: `${navBG}`, color: `${textColor}`}} className="w-full fixed top-0 left-0 z-[100] shadow-xl">
      <div className="max-w-[1240px] h-20 m-auto flex justify-center items-center px-3">
        <div className="mr-auto">
          <h1 className="text-xl md:text-3xl">The Crammed Mox</h1>
        </div>
        <div className="flex justify-center items-center">
          <Link href="/">
            <p className="cursor-pointer p-2">Search</p>
          </Link>
          <Link href="/DeckCheck">
            <p className="cursor-pointer p-2">Deck Check</p>
          </Link>
          <Link href="/Blotter"><p className="cursor-pointer p-2">Blotter</p></Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
