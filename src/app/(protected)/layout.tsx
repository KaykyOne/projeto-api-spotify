"use client"
import Navbar from "@/components/navbar";
import Btn from "@/components/btn";
import { useRouter } from "next/navigation";
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter();
  return (
    <div className="flex flex-col w-full h-screen relative py-5 items-center justify-start md:pl-40 p-4">
      <div className="flex w-full mb-6">
        <Btn tip="back" onClick={() => router.push('/')}>
          Sair
          <ExitToAppRoundedIcon />
        </Btn>
      </div>
        {children}
      <Navbar />
    </div>
  );
}
