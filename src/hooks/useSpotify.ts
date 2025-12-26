"use client"
const API_URL = process.env.NEXT_PUBLIC_API_URL;


async function login() {
    const { url } = await fetch(`${API_URL}/spotify/login`).then(r => r.json());
    console.log(url);
    window.location.href = url;
}

async function searchArtist(name: string) {
    const token = localStorage.getItem("auth_token"); // pega token do localStorage
    if (!token) return null;
    const response = await fetch(`${API_URL}/spotify/search/${encodeURIComponent(name)}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) return null;
    return response.json();
}


export { API_URL, searchArtist, login };