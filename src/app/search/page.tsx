import React from 'react'
import Input from '@/components/input'

export default function page() {
    return (
        <div className='flex flex-col w-full h-full justify-center items-center py-5'>
            <h1>Pesquise os artistas</h1>
            <Input placeholder='Pesquisar artista...' className='w-1/4 mb-10' />
        </div>
    )
}
