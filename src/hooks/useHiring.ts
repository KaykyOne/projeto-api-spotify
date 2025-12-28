"use client"
const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { Hiring } from "@/models/hiring";

async function listHiring() {
    const token = localStorage.getItem("auth_token");
    const user_id = localStorage.getItem("user_id");

    if (!token) return null;

    const response = await fetch(`${API_URL}/api/hiring/list/${user_id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) return null;
    const res = await response.json();
    const hirings: Hiring[] = res.hirings;
    return hirings;
}

async function createHiring(data: Omit<Hiring, 'id'>) {
    const token = localStorage.getItem("auth_token");
    const user_id = localStorage.getItem("user_id");
    data.user_id = Number(user_id) || 0;
    console.log(data);
    if (!token) return null;

    const response = await fetch(`${API_URL}/api/hiring/create`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) return null;
    const res = await response.json();
    return res;
}

async function deleteHiring(id: number) {
    const token = localStorage.getItem("auth_token");
    if (!token) return null;

    const response = await fetch(`${API_URL}/api/hiring/delete/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) return null;
    const res = await response.json();
    return res;
}

export { listHiring, createHiring, deleteHiring };
