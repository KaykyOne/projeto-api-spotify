"use client"
import Navbar from "@/components/navbar";
import Btn from "@/components/btn";
import { useRouter } from "next/navigation";
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";

// Protected layout - wraps authenticated pages with navbar and logout button
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const router = useRouter();
  // Auto-logout timer - redirects to login page after 1 hour (3600000ms) to refresh authentication token
  const startTimer = () => {
    let timer = setTimeout(() => {
      router.push('/')
    }, 3600000)
    return timer;
  }

  // Sets up auto-logout timer on component mount - clears timer on unmount to prevent memory leaks
  useEffect(() => {
    let timer = startTimer();
    return () => clearTimeout(timer);
  }, [])

  return (
    // Main container - provides flexbox layout with responsive padding for navbar
    <div className="flex flex-col w-full h-screen relative overflow-hidden items-center justify-start md:pl-40 p-4 md:p-1">
      {/* Header with logout button - positioned at top of page */}
      <div className="flex w-full mb-6 bg-neutral-900 p-5 rounded-2xl justify-between items-center">
        <Btn tip="cancel" className="!w-fit px-10" onClick={() => router.push('/')}>
          Sair
          <ExitToAppRoundedIcon />
        </Btn>
      </div>
      {/* Content area - scrollable container for page content */}
      <div className="flex w-full h-full overflow-y-auto max-h-screen">
        {children}
      </div>
      {/* Navigation bar - positioned at bottom or left depending on screen size */}
      <Navbar />
      {/* Toast notifications container - displays succes/error messages */}
      <ToastContainer position="top-left" />
    </div>
  );
}
