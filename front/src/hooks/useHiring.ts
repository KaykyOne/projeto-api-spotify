"use client"
const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { Hiring } from "@/models/hiring";
import { toast } from "react-toastify";

async function listHiring() {
    const token = localStorage.getItem("auth_token");
    const user_id = localStorage.getItem("user_id");

    if (!token) return null;

    try {
        const response = await fetch(`${API_URL}/api/hiring?user_id=${user_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            toast.error("Erro ao listar contratos");
            return null;
        }

        const res = await response.json();
        const hirings: Hiring[] = res.hirings;
        return hirings;
    } catch (error) {
        toast.error("Failed to list hiring");
        console.error("Failed to list hiring:", error);
        return null;
    }
}

async function createHiring(data: Omit<Hiring, 'id'>) {
    const token = localStorage.getItem("auth_token");
    const user_id = localStorage.getItem("user_id");
    data.user_id = Number(user_id);
    if (!user_id) throw new Error("User not authenticated");

    if (!token) return null;
    try {
        const response = await fetch(`${API_URL}/api/hiring`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            toast.error("Erro ao criar contrato");
            return null;
        };

        toast.success("Contrato criado com sucesso!");
        const res = await response.json();
        return res;
    } catch (error) {
        toast.error("Failed to create hiring");
        console.error("Failed to create hiring:", error);
        return null;
    }
}

async function deleteHiring(id: number) {
    const token = localStorage.getItem("auth_token");
    if (!token) return null;

    try {
        const response = await fetch(`${API_URL}/api/hiring/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            toast.error("Erro ao excluir contrato");
            return null
        };

        toast.success("Contrato excluido com sucesso!");
        const res = await response.json();
        return res;
    } catch (error) {
        toast.error("Failed to delete hiring");
        console.error("Failed to delete hiring:", error);
        return null;
    }
}

export { listHiring, createHiring, deleteHiring };
