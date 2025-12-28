"use client"
import Input from '@/components/input'
import React, { useState, useEffect } from 'react'
import Loading from '@/components/loading';
import Image from 'next/image';
import { Artist } from "@/models/artist";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ModalHiring from '@/components/modalHiring';
import { useSearchParams } from 'next/navigation';

import { searchArtist } from "@/hooks/useSpotify";
let timer: any = null;

export default function page() {

  const searchParams = useSearchParams();

  const [artistName, setArtistName] = useState<string>('');
  const [artistSelected, setArtistSelected] = useState<Artist | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(5);
  const limit = 5;

  useEffect(() => {
    if (!artistName) {
      setArtists([]);
      setLoading(false);
    } else {
      setLoading(true)
    }
    setPage(0);
    if (!timer) startTimer();
    else resetTimer();
  }, [artistName]);

  useEffect(() => {
    const name = searchParams.get("artist");
    if (name) {
      setArtistName(name);
    }
    setTimeout(() => {
      window.history.replaceState({}, document.title, "/search");
    }, 0);
  }, [])

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    if (!artistName) return;
    const res = await searchArtist(artistName, limit, page * limit);
    if (res) {
      setArtists(res);
      setLoading(false);
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

  function RenderElements() {
    return (
      <div className='flex flex-col gap-3 w-full'>
        {artists.map((artist) => {
          return (
            <div key={artist.id} className='flex items-center gap-4 w-full bg-neutral-950 rounded-2xl shadow hover:bg-neutral-800 transition-all duration-300 cursor-pointer p-4' onClick={() => setArtistSelected(artist)}>
              {artist.images[0] ? (
                <Image
                  src={artist.images[0]?.url}
                  alt={artist.name}
                  className='rounded-lg'
                  width={80}
                  height={80}
                />
              ) : (
                <div className='w-[80px] h-[80px] rounded-lg bg-neutral-700 flex justify-center items-center'>
                  <AccountCircleIcon className='text-neutral-500' style={{ fontSize: 60 }} />
                </div>
              )}


              <div className='flex flex-col flex-1'>
                <h2 className='text-lg font-semibold'>{artist.name}</h2>
                <p className='text-sm text-neutral-400'>
                  {Number(artist.followers.total).toLocaleString()} seguidores
                </p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  function Sleep() {
    return (
      <div className='flex flex-col gap-2 w-full h-full justify-center items-center'>
        <Image alt='sheep' src={'/gifovelha.gif'} width={200} height={200} />
        <h1 className='text-neutral-300'>Digite algo para pesquisar!</h1>
      </div>
    )
  }

  return (
    <div className='flex flex-col w-full h-full justify-start items-center gap-4'>
      <div className='w-full'>
        <h1 className='text-3xl font-bold capitalize'>Pesquise artistas</h1>
        <p className='text-neutral-400 text-sm'>Encontre informações sobre seus artistas favoritos</p>
      </div>
      <Input
        placeholder='Digite o nome do artista...'
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
      />
      <div className='flex-1 w-full max-h-[50vh] md:h-full overflow-y-auto'>
        {loading ? <Loading type='bone' number={5} /> : (artists.length > 0 ? <RenderElements /> : <Sleep />)}
      </div>

      {artistName && artists.length > 0 && (
        <div className='flex gap-2 justify-center items-center'>
          <button
            onClick={() => setPage(p => Math.max(p - 1, 0))}
            className='cursor-pointer'
            disabled={page === 0 || loading}
          >{"<"}
          </button>
          <button
            onClick={() => setPage(p => p + 1)}
            className='cursor-pointer'
            disabled={loading}
          >{">"}
          </button>
        </div>
      )}
      {artistSelected && (
        <ModalHiring artistSelected={artistSelected} setArtistSelected={setArtistSelected} />
      )}
    </div>
  )
}
