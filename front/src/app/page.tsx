"use client"
import Btn from "@/components/btn";
import Input from "@/components/input";
import Image from "next/image";
import { useState } from "react";
import Loading from "@/components/loading";

import { login } from "@/hooks/useSpotify";

// Landing page - displays welcome message and login button for Spotify authentication
export default function Home(){
  // State for tracking login button loading state
  const [loading, setLoading] = useState(false);

  return (
    // Main container - centered fullscreen layout
    <main className="flex flex-col justify-center items-center h-screen w-screen">
      {/* Content card - responsive width container for welcome section */}
      <div className="flex flex-col gap-10 p-3 w-full md:max-w-[40vw] items-center justify-center">
        {/* Logo section - displays aplication logo in rounded container */}
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          className="bg-neutral-900 p-5 rounded-2xl"
          width={100}
          height={100}
          priority
        />
        {/* Header text - welcome message and subtitle instruction */}
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="text-4xl font-black text-center">Seja Bem-Vindo</h1>
          <h2 className="text-neutral-400 text-xl font-medium text-center">Clique em iniciar para visualizar os seus artistas!</h2>
        </div>
        {/* Login button - triggers Spotify OAuth flow with loading state */}
        <Btn onClick={() => login({ setLoading })} disabled={loading} className="w-full">
          {loading ?  <Loading className="!h-fit !w-fit !min-h-0"  type="simple"/> : "Login"}
        </Btn>
        {/* Footer credit text */}
        <p className="text-sm font-light text-neutral-500">Um oferecimento Kayky Zioti</p>
      </div>
    </main>
  );
}
