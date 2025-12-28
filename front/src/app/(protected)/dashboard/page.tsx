"use client"
import React, { useEffect, useState } from 'react'
import { useSearchParams } from "next/navigation";
import { searchArtist } from '@/hooks/useSpotify';
import { Artist } from '@/models/artist';
import Carrosel from '@/components/carrosel';
import Loading from '@/components/loading';

export default function page() {

  const searchParams = useSearchParams();
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const token = searchParams.get("token");
    const user_id = searchParams.get("user_id");

    if (token && user_id) {
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user_id", user_id);
      setTimeout(() => {
        window.history.replaceState({}, document.title, "/dashboard");
      }, 0);
    }
  }, [searchParams]);

  useEffect(() => {
    const search = async () => {
      setLoading(true);
      try {
        const res = await searchArtist("lana", 10, 0);
        setArtists(res || []);
      }catch (error) {
        console.error("Error fetching artists:", error);
      }finally{
        setLoading(false);
      }

    }

    search();
  }, []);



  return (
    <div className='w-full h-full flex flex-col gap-4 pt-6'>
      <div className='flex flex-col'>
        <h1 className='text-5xl font-semibold'>Bem-Vindo!</h1>
        <h4 className='text-neutral-400 font-light'>Top semanal:</h4>
      </div>

      {loading ? <div className='w-full h-75   flex justify-center items-center'><Loading type='simple'/></div> : <Carrosel artists={artists} />}
    </div>
  )
}
