import React, { useState } from 'react'
import Modal from './modal'
import { Artist } from '@/models/artist'
import Input from './input'
import Btn from './btn'
import { createHiring } from '@/hooks/useHiring'
import { Hiring } from '@/models/hiring'

type Props = {
    artistSelected: Artist;
    setArtistSelected: (artist: Artist | null) => void;
}

export default function ModalHiring({ artistSelected, setArtistSelected }: Props) {
    const [contractValue, setContractValue] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [eventDate, setEventDate] = useState<string>('    ');
    const [eventAddress, setEventAddress] = useState<string>('');

    const css = {
        selected: 'bg-neutral-200 rounded-full h-3 w-3',
        notSelected: 'bg-neutral-600 rounded-full h-3 w-3'
    }

    const submitHiring = async (e: React.FormEvent) => {
        e.preventDefault();

        const newHiringData: Omit<Hiring, 'id'> =
        {
            spotify_id: artistSelected.id,
            name: name,
            value: parseFloat(contractValue),
            event_date: eventDate,
            address: eventAddress
        };
        const res = await createHiring(newHiringData);
        if (res) {
            alert('Contratação realizada com sucesso!');
            setArtistSelected(null);
        } else {
            alert('Erro ao realizar contratação. Tente novamente.');
        }
    }

    const [num, setNum] = useState<number>(0);
    return (
        <Modal>
            <div className='flex flex-col w-full h-full md:min-w-[400px] md:min-h-[400px]'>
                <div className='flex w-full justify-between mb-5'>
                    {num > 0 ? <button className='cursor-pointer' onClick={() => setNum(num - 1)} disabled={num == 0}>{"< Voltar"}</button> : <div></div>}
                    <button className='cursor-pointer' onClick={() => setArtistSelected(null)}>X</button>
                </div>

                {num == 0 && (
                    <div className='flex flex-col gap-2 items-start h-full'>
                        <div className='flex flex-col mb-4'>
                            <h1 className='text-3xl font-semibold'>Artista Selecionado</h1>
                            <h3 className='text-sm font-light text-neutral-300'>Confirme se esse é o artista que você deseja contratar</h3>
                        </div>

                        <div className='text-neutral-400 gap-2 flex flex-col w-full'>
                            <label>Nome:</label>
                            <Input value={artistSelected.name} disabled />
                            <label>Popularidade:</label>
                            <Input value={artistSelected.popularity + "%"} disabled />
                            <label>Tipo:</label>
                            <Input value={artistSelected.type} disabled />
                            <label>Seguidores:</label>
                            <Input value={(artistSelected.followers.total).toLocaleString()} disabled />
                            <a href={artistSelected.external_urls.spotify} className='bg-neutral-800 p-2 rounded-lg' target="_blank">Ouça no Spotify</a>
                        </div>

                        <Btn className='mt-5' onClick={() => setNum(1)}>
                            Avançar
                        </Btn>
                    </div>
                )}

                {num == 1 && (
                    <div className='flex flex-col gap-2 items-start h-full'>
                        <div className='flex flex-col mb-4'>
                            <h1 className='text-3xl font-semibold'>Contratação</h1>
                            <h3 className='text-sm font-light text-neutral-300'>Preencha os dados e contrate o artista!</h3>
                        </div>
                        <form className='flex flex-col gap-2 w-full' onSubmit={submitHiring}>
                            <label className='text-neutral-400'>Valor da Contratação (R$):</label>
                            <Input required type='number' placeholder='Valor em reais' value={contractValue} onChange={e => setContractValue(e.target.value)} />
                            <label className='text-neutral-400'>Nome do Show:</label>
                            <Input required type='text' placeholder='Seu nome' value={name} onChange={e => setName(e.target.value)} />
                            <label className='text-neutral-400'>Data do evento:</label>
                            <Input required type='date' placeholder='Data do evento' value={eventDate} onChange={e => setEventDate(e.target.value)} />
                            <label className='text-neutral-400'>Endereço:</label>
                            <Input required type='text' placeholder='Endereço do evento' value={eventAddress} onChange={e => setEventAddress(e.target.value)} />
                            <Btn className='mt-5 w-full' tip='submit'>Contratar</Btn>
                        </form>

                    </div>
                )}
                <div className='flex gap-2 w-full justify-center mt-3'>
                    <div className={num == 0 ? css.selected : css.notSelected}></div>
                    <div className={num == 1 ? css.selected : css.notSelected}></div>
                </div>
            </div>
        </Modal>
    )
}
