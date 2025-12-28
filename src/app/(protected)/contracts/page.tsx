"use client"
import React, { useEffect, useState } from 'react'
import { Hiring } from '@/models/hiring';
import { listHiring } from '@/hooks/useHiring';

export default function page() {
  const [hirings, setHirings] = useState<Hiring[]>([]);

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
            <p>Endereço: {hiring.adress}</p>
          </div>
        )
      })
    )
  }

  return (
    <div className='h-full w-full'>
      <h1 className='text-3xl font-bold mb-6'>Minhas Contratações</h1>
      <div className='flex flex-col gap-4'>
        {hirings.length > 0 ? <RenderHirings /> : <p className='text-neutral-500'>Nenhuma contratação encontrada.</p>}
      </div>
    </div>
  )
}
