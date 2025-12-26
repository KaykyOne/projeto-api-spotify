import React from 'react'

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode
}

export default function Btn({ children, ...props }: BtnProps) {
  return (
    <button
    className='border-2 border-white py-4 px-3 cursor-pointer transition-all duration-300 text-white hover:bg-white hover:text-black w-full rounded-full'
    {...props}
    >
      {children}
    </button>
  )
}
