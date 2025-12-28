"use client"
import React, { useEffect, useState } from 'react'
import { Hiring } from '@/models/hiring';
import { listHiring, deleteHiring } from '@/hooks/useHiring';
import Btn from '@/components/btn';
import Modal from '@/components/modal';

export default function page() {
  const [hirings, setHirings] = useState<Hiring[]>([]);
  const [selectedHiringId, setSelectedHiringId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchHirings() {
      const res: Hiring[] | null = await listHiring();
      if (res) {
        setHirings(res);
      }
    }
    fetchHirings();
  }, []);

  const RenderHirings = () => {
    return (
      hirings.map((hiring) => {
        return (
          <div key={hiring.id} className='w-full bg-neutral-900 p-4 rounded-lg shadow flex flex-col gap-2'>
            <h2 className='text-xl font-bold'>{hiring.name}</h2>
            <p>Valor: R$ {hiring.value}</p>
            <p>Data: {hiring.event_date}</p>
            <p>Endereço: {hiring.address}</p>
            <Btn tip='cancel' onClick={() => setSelectedHiringId(hiring.id)}>Cancelar Contratação</Btn>
          </div>
        )
      })
    )
  }

  const handleCancelHiring = async (hiringId: number) => {
    const res = await deleteHiring(hiringId);
    setSelectedHiringId(null);
    if (res) {
      alert('Contratação cancelada com sucesso!');
      setHirings(hirings.filter(hiring => hiring.id !== hiringId));
    } else {
      alert('Erro ao cancelar contratação. Tente novamente.');
    }
  }

  return (
    <div className='h-full w-full'>
      <h1 className='text-3xl font-bold mb-6'>Minhas Contratações</h1>
      <div className='flex flex-col gap-4'>
        {hirings.length > 0 ? <RenderHirings /> : <p className='text-neutral-500'>Nenhuma contratação encontrada.</p>}
      </div>
      {selectedHiringId !== null && (
        <Modal>
          <div className='flex flex-col gap-4'>
            <h2 className='text-2xl font-bold'>Cancelar Contratação</h2>
            <p>Tem certeza que deseja cancelar esta contratação?</p>
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
