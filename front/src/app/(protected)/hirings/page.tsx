"use client"
import React, { useEffect, useState } from 'react'
import { Hiring } from '@/models/hiring';
import { listHiring, deleteHiring } from '@/hooks/useHiring';
import Btn from '@/components/btn';
import Modal from '@/components/modal';
import Loading from '@/components/loading';

export default function page() {
  const [hirings, setHirings] = useState<Hiring[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedHiringId, setSelectedHiringId] = useState<number | null>(null);

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
                  <p className='text-sm font-semibold text-neutral-200'>{hiring.event_date}</p>
                </div>
                <div className='bg-neutral-900/50 rounded-lg p-3 border border-neutral-700/50'>
                  <p className='text-xs text-neutral-400 mb-1'>📍 Localização</p>
                  <p className='text-sm font-semibold text-neutral-200 truncate'>{hiring.address}</p>
                </div>
              </div>

              <Btn tip='cancel' onClick={() => setSelectedHiringId(hiring.id)}>Cancelar Contratação</Btn>
            </div>
          )
        })
      )
    )
  }

  const handleCancelHiring = async (hiringId: number) => {
    const res = await deleteHiring(hiringId);

    if (res) {
      setHirings(hirings.filter(e => e.id !== hiringId))
      setSelectedHiringId(null);
    }
  }

  return (
    <div className='h-full w-full'>
      <div className='mb-8'>
        <h1 className='text-4xl font-bold mb-2'>Minhas Contratações</h1>
        <p className='text-neutral-400'>Gerencie todos os seus eventos e contratos</p>
      </div>

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
          <p className='text-neutral-400 text-lg'>Nenhuma contratação encontrada</p>
          <p className='text-neutral-500 text-sm'>Explore artistas e crie novos eventos</p>
        </div>
      )}

      {selectedHiringId !== null && (
        <Modal>
          <div className='flex flex-col gap-6'>
            <div>
              <h2 className='text-2xl font-bold mb-2'>Cancelar Contratação</h2>
              <p className='text-neutral-400'>Tem certeza que deseja cancelar esta contratação? Esta ação não pode ser desfeita.</p>
            </div>
            <div className='flex gap-4'>
              <Btn tip="submit" onClick={() => setSelectedHiringId(null)}>Não</Btn>
              <Btn tip="cancel" onClick={() => handleCancelHiring(selectedHiringId!)}>Sim</Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
