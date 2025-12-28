import React from 'react'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SummarizeRoundedIcon from '@mui/icons-material/SummarizeRounded';
import Link from 'next/link';

// Default CSS class for navigation links - applies hover effects and styling
const cssDefault = "flex gap-2 justify-center text-neutr items-center flex-col w-full h-[100px] hover:bg-neutral-800 rounded-lg cursor-pointer transition-all duration-300 text-light text-neutral-500 hover:text-white";

// Navigation bar component with links to dashboard, search, and hirings pages
export default function Navbar() {
    return (
        <div className='bg-neutral-900 w-full md:w-[120px] flex md:flex-col md:absolute md:left-5 gap-5 justify-center items-center bottom-5 p-2  rounded-2xl shadow-lg md:h-full md:justify-start md:py-4 md:top-1'>
            <Link href='/dashboard' className={cssDefault}>
                <HomeRoundedIcon/>
                <span className="text-sm font-light">home</span>
            </Link>
            <Link href='/search' className={cssDefault}>
                <SearchRoundedIcon/>
                <span className="text-sm font-light">pesquisar</span>
            </Link>
            <Link href='/hirings' className={cssDefault}>
                <SummarizeRoundedIcon/>
                <span className="text-sm font-light">contratações</span>
            </Link>
        </div>
    )
}
