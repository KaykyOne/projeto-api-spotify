"use client"
import { Artist } from '@/models/artist';
import React, { useRef, useEffect } from 'react'
import Image from 'next/image';

export default function Carrosel({ artists }: { artists?: Artist[] }) {
    if (!artists) return null;
    const carouselRef = useRef<HTMLDivElement>(null);
    const rafId = useRef<number | null>(null);

    useEffect(() => {
        let lastTime = 0;

        const loop = (time: number) => {
            if (!carouselRef.current) return;

            if (time - lastTime > 16) {
                carouselRef.current.scrollBy({ left: 1 });
                lastTime = time;
            }
            if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth - carouselRef.current.clientWidth) {
                carouselRef.current.scrollLeft = 0;
            }
            rafId.current = requestAnimationFrame(loop);
        };

        rafId.current = requestAnimationFrame(loop);

        return () => {
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, []);

    const RenderItem = ({ artist }: { artist: Artist }) => {
        if (artist.images.length === 0) return null;
        return (
            <div className='bg-neutral-800 hover:bg-neutral-700 transition-all duration-300 hover:scale-105 rounded-lg flex flex-col justify-center items-center p-4 cursor-pointer relative min-w-[450px] min-h-[300px]'>
                <Image
                    src={artist.images[0]?.url}
                    alt={artist.name}
                    className="rounded-lg w-full h-full absolute object-cover"
                    width={1000}
                    height={1000}
                />
                <div className='absolute flex flex-col w-full h-full justify-center text-center items-center bg-black/70 rounded-lg z-10'>
                    <h3 className="mt-2 text-lg font-semibold">{artist.name}</h3>
                    <h3 className="mt-2 text-5xl font-semibold">{(artist.followers.total).toLocaleString()}</h3>
                    <p>Seguidores</p>
                </div>
            </div>
        )
    }

    return (
        <div ref={carouselRef} id='carrosel' className='flex gap-4 overflow-x-auto w-full py-4'>
            {artists.map((artist) => (
                <div key={artist.id}>
                    <RenderItem artist={artist} />
                </div>
            ))}
        </div>
    )
}
