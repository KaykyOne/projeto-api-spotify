"use client"
const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { Artist } from "@/models/artist";

// Redirects user to Spotify OAuth login endpoint - gets authorization token
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

// Searches for artists on Spotify by name - supports pagination with limit and offset
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

async function searchArtistById(spotify_id: string){
    const token = localStorage.getItem("auth_token");
    if (!token) return null;
    
    try {
        const url = new URLSearchParams({
            spotify_id: spotify_id,
        })
        const response = await fetch(`${API_URL}/spotify/searchid?${url.toString()}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) return null;
        const res = await response.json();
        console.log(res);
        const artist:Artist = res;
        return artist;
    } catch (error) {
        console.error("Failed to search artist:", error);
        return null;
    }
}


export { API_URL, searchArtist, login, searchArtistById };