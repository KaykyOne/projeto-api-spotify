"use client"
import Navbar from "@/components/navbar";
import Btn from "@/components/btn";
import { useRouter } from "next/navigation";
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter();
  return (
    <div className="flex flex-col w-full h-screen relative overflow-hidden items-center justify-start md:pl-40 p-4 md:p-1">
      <div className="flex w-full mb-6 bg-neutral-900 p-5 rounded-2xl justify-between items-center">
        <Btn tip="cancel" className="!w-fit px-10" onClick={() => router.push('/')}>
          Sair
          <ExitToAppRoundedIcon />
        </Btn>
      </div>
      <div className="flex w-full h-full overflow-y-auto max-h-screen">
        {children}
      </div>
      <Navbar />
      <ToastContainer position="top-left" />
    </div>
  );
}
