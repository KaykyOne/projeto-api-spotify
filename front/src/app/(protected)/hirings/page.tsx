"use client"
import React, { useEffect, useState } from 'react'
import { Hiring } from '@/models/hiring';
import { listHiring, deleteHiring } from '@/hooks/useHiring';
import { searchArtistById } from '@/hooks/useSpotify';
import Btn from '@/components/btn';
import Modal from '@/components/modal';
import Loading from '@/components/loading';
import { Artist } from '@/models/artist';
import { addDays, format } from 'date-fns';
import Input from '@/components/input';

type tipFunc = {
  tip: "see" | "cancel";
}

// Hirings page - displays list of all artist contracts and allows cancellation
export default function page() {
  // State managment for hirings data and modal confirmation
  const [hirings, setHirings] = useState<Hiring[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedHiring, setSelectedHiring] = useState<Hiring | null>(null);
  const [functionCalled, setFunctionCalled] = useState<tipFunc | null>(null);
  const [artistDetails, setArtistDetails] = useState<Artist | null>(null);

  // Fetches hirings list on component mount
  useEffect(() => {
    async function fetchHirings() {
      setLoading(true);
      try {
        const res: Hiring[] | null = await listHiring();
        if (res) {
          setHirings(res);
        }
      } catch (error) {
        console.error("Error fetching hirings:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHirings();
  }, []);

  useEffect(() => {

    const fetchDetails = async () => {
      if (selectedHiring) {
        const artist = await searchArtistById(selectedHiring.spotify_id);
        if (artist) {
          setArtistDetails(artist);
        }
      }
    }

    if (selectedHiring !== null && functionCalled?.tip === "see") {
      fetchDetails();
    } else {
      setArtistDetails(null);
    }

  }, [selectedHiring]);

  // Renders hirings list with details - shows date, location, value, and cancel buton
  const RenderHirings = () => {
    return (
      loading ? (
        <Loading type='bone' number={3} />
      ) : (
        hirings.map((hiring) => {
          return (
            <div key={hiring.id} className='w-full bg-gradient-to-br from-neutral-800/50 to-neutral-900/80 p-6 rounded-xl shadow-lg border border-neutral-700/50 hover:border-amber-600/50 transition flex flex-col gap-4'>
              <div className='flex justify-between items-start gap-4'>
                <div className='flex-1'>
                  <h2 className='text-2xl font-bold text-white mb-1'>{hiring.name}</h2>
                  <div className='flex items-center gap-2'>
                    <span className='inline-block w-2 h-2 rounded-full bg-green-500'></span>
                    <p className='text-xs text-green-400 font-medium'>Contratação Ativa</p>
                  </div>
                </div>
                <div className='bg-amber-600/20 border border-amber-600/50 px-4 py-2 rounded-lg'>
                  <p className='text-lg font-bold text-amber-400'>R$ {hiring.value}</p>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='bg-neutral-900/50 rounded-lg p-3 border border-neutral-700/50'>
                  <p className='text-xs text-neutral-400 mb-1'>📅 Data do Evento</p>
                  <p className='text-sm font-semibold text-neutral-200'>{format(addDays(new Date(hiring?.event_date!), 1), 'dd/MM/yyyy')}</p>
                </div>
                <div className='bg-neutral-900/50 rounded-lg p-3 border border-neutral-700/50'>
                  <p className='text-xs text-neutral-400 mb-1'>📍 Localização</p>
                  <p className='text-sm font-semibold text-neutral-200 truncate'>{hiring.address}</p>
                </div>
              </div>

              <Btn tip='cancel' onClick={() => { setSelectedHiring(hiring); setFunctionCalled({ tip: "cancel" }); }}>Cancelar Contratação</Btn>
              <Btn tip='button1' onClick={() => { setSelectedHiring(hiring); setFunctionCalled({ tip: "see" }); }}>Visualizar Contratação</Btn>

            </div>
          )
        })
      )
    )
  }

  // Handles hiring deletion - removes contract from database
  const handleCancelHiring = async (hiringId: number) => {
    const res = await deleteHiring(hiringId);

    if (res) {
      setHirings(hirings.filter(e => e.id !== hiringId))
      setSelectedHiring(null);
    }
  }

  return (
    <div className='h-full w-full'>
      {/* Header section with title and description */}
      <div className='mb-8'>
        <h1 className='text-4xl font-bold mb-2'>Minhas Contratações</h1>
        <p className='text-neutral-400'>Gerencie todos os seus eventos e contratos</p>
      </div>

      {/* Display hirings list or empty state message */}
      {hirings.length > 0 ? (
        <div>
          <div className='mb-4 flex items-center gap-2'>
            <span className='text-sm text-neutral-400'>Total de eventos:</span>
            <span className='bg-amber-600/20 text-amber-400 px-3 py-1 rounded-full text-sm font-medium'>{hirings.length} contratações</span>
          </div>
          <div className='flex flex-col gap-4'>
            <RenderHirings />
          </div>
        </div>
      ) : (
        <div className='h-96 flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-neutral-700'>
          <p className='text-4xl'>🎭</p>
          {/* Empty state message - shows when no hiring contracs exist */}
          <p className='text-neutral-400 text-lg'>Nenhuma contratação encontrada</p>
          <p className='text-neutral-500 text-sm'>Explore artistas e crie novos eventos</p>
        </div>
      )}

      {selectedHiring !== null && (
        <Modal>
          {functionCalled?.tip === "cancel" ? (
            <div className='flex flex-col gap-6'>
              <div>
                <h2 className='text-2xl font-bold mb-2'>Cancelar Contratação</h2>
                <p className='text-neutral-400'>Tem certeza que deseja cancelar esta contratação? Esta ação não pode ser desfeita.</p>
              </div>
              <div className='flex gap-4'>
                <Btn tip="submit" onClick={() => setSelectedHiring(null)}>Não</Btn>
                <Btn tip="cancel" onClick={() => handleCancelHiring(selectedHiring.id!)}>Sim</Btn>
              </div>
            </div>
          ) :
            (
              <div className='flex flex-col gap-6'>
                <div>
                  {loading || artistDetails === null ? (
                    <div className='min-w-[300px]'>
                      <Loading type='simple' />
                    </div> 
                  ) : (
                    <div className='flex flex-col gap-4 min-w-[400px] pb-5'>
                      <div>
                        <h2 className='text-2xl font-bold mb-1'>Detalhes da Contratação</h2>
                        <p className='text-neutral-400 text-sm'>Veja as informações completas sobre esta contratação.</p>
                      </div>
                      
                      <div className='flex flex-col gap-2'>
                        <label className='text-neutral-400 text-sm'>Artista</label>
                        <Input value={artistDetails?.name} disabled />
                      </div>

                      <div className='flex flex-col gap-2'>
                        <label className='text-neutral-400 text-sm'>Popularidade</label>
                        <Input value={`${artistDetails?.popularity}%`} disabled />
                      </div>

                      <div className='flex flex-col gap-2'>
                        <label className='text-neutral-400 text-sm'>Data do Evento</label>
                        <Input value={format(addDays(new Date(selectedHiring?.event_date!), 1), 'dd/MM/yyyy')} disabled />
                      </div>

                      <div className='flex flex-col gap-2'>
                        <label className='text-neutral-400 text-sm'>Valor</label>
                        <Input value={(selectedHiring?.value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} disabled />
                      </div>

                      <div className='flex flex-col gap-2'>
                        <label className='text-neutral-400 text-sm'>Local</label>
                        <Input value={selectedHiring?.address} disabled />
                      </div>
                    </div>
                  )}

                  <Btn tip="button1" onClick={() => setSelectedHiring(null)}>Fechar</Btn>
                </div>
              </div>
            )}
        </Modal>
      )}
    </div>
  )
}
