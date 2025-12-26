"use client"
import Input from '@/components/input'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from "next/navigation";
import Loading from '@/components/loading';

import { searchArtist } from "@/hooks/useSpotify";
let timer: any = null;

export default function page() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("auth_token", token);
      window.history.replaceState({}, document.title, "/dashboard");
    }
  }, [searchParams]);

  const [artistName, setArtistName] = useState<string>('');
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


  const fetchData = async () => {
    if (!artistName) return;
    const res = await searchArtist(artistName);
    if (res != null) {
      setArtists(res.artists.items);
    }
  }

  const startTimer = () => {
    timer = setTimeout(async function () {
      console.log("Executou");
      await fetchData();
    }, 2000)
  }

  function resetTimer() {
    clearTimeout(timer); // cancela o antigo
    startTimer();        // cria um novo
  }

  useEffect(() => {
    if (!timer) startTimer();
    else resetTimer();
  }, [artistName]);


  return (
    <div className='flex flex-col w-full h-full justify-center items-center '>
      <div className='flex flex-col w-full md:max-w-1/2 py-5 gap-5 px-5'>
        <h1 className='text-2xl font-black capitalize'>Pesquise os artistas</h1>
        <Input placeholder='Pesquisar artista...' className='mb-10' value={artistName} onChange={(e) => setArtistName(e.target.value)} />
        {loading ? <Loading /> : (
          artists.map((element) => (
            <div key={element.id} className='flex flex-col justify-center items-center mb-5'>
              <img src={element.images[0]?.url} alt={element.name} className='w-32 h-32 rounded-full mb-2' />
              <h2 className='text-xl font-semibold'>{element.name}</h2>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
