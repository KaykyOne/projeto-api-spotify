"use client"
import Btn from "@/components/btn";
import Input from "@/components/input";
import Image from "next/image";
import { useState } from "react";
import Loading from "@/components/loading";

import { login } from "@/hooks/useSpotify";

export default function Home(){
  const [loading, setLoading] = useState(false);

  return (
    <main className="flex flex-col justify-center items-center h-screen w-screen">
      <div className="flex flex-col gap-10 p-3 w-full md:max-w-[40vw] items-center justify-center">
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          className="bg-neutral-900 p-5 rounded-2xl"
          width={100}
          height={100}
          priority
        />
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="text-4xl font-black text-center">Seja Bem-Vindo</h1>
          <h2 className="text-neutral-400 text-xl font-medium text-center">Clique em iniciar para visualizar os seus artistas!</h2>
        </div>
        <Btn onClick={() => login({ setLoading })} disabled={loading} className="w-full">
          {loading ?  <Loading type="simple"/> : "Login"}
        </Btn>
        <p className="text-sm font-light text-neutral-500">Um oferecimento Kayky Zioti</p>
      </div>
    </main>
  );
}
