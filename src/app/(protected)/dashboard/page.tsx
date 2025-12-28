"use client"
import React, { useEffect } from 'react'
import { useSearchParams } from "next/navigation";

export default function page() {

  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const user_id = searchParams.get("user_id");

    if (token && user_id) {
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user_id", user_id);
      setTimeout(() => {
        window.history.replaceState({}, document.title, "/dashboard");
      }, 0);
    }
  }, [searchParams]);

  return (
    <div className='w-full h-full'>page</div>
  )
}
