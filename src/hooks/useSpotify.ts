"use client"
const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { Artist } from "@/models/artist";


async function login({ setLoading }: { setLoading: (loading: boolean) => void }) {
    setLoading(true);
    const { url } = await fetch(`${API_URL}/spotify/login`).then(r => r.json());
    window.location.href = url;
}

async function searchArtist(name: string, max:number, offset:number){
    const token = localStorage.getItem("auth_token"); // pega token do localStorage
    if (!token) return null;
    const url = new URLSearchParams({
        name: name,
        limit: max.toString(),
        offset: offset.toString()
    })
    const response = await fetch(`${API_URL}/spotify/search?${url.toString()}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) return null;
    const res = await response.json();
    const artists:Artist[] = res.artists.items;
    return artists;
}


export { API_URL, searchArtist, login };