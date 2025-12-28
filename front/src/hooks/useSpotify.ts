"use client"
const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { Artist } from "@/models/artist";


async function login({ setLoading }: { setLoading: (loading: boolean) => void }) {
    setLoading(true);
    try {
        const { url } = await fetch(`${API_URL}/spotify/login`).then(r => r.json());
        window.location.href = url;
    } catch (error) {
        console.error("Failed to login:", error);
        setLoading(false);
    }
}

async function searchArtist(name: string, max:number, offset:number){
    const token = localStorage.getItem("auth_token");
    if (!token) return null;
    
    try {
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
    } catch (error) {
        console.error("Failed to search artist:", error);
        return null;
    }
}


export { API_URL, searchArtist, login };