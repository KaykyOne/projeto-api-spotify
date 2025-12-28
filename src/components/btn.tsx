import React from 'react'

type tips = 'button1' | 'button2' | 'submit' | 'back' | undefined

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode
  className?: string
  tip?: tips
}

export default function Btn({ children, className, tip, ...props }: BtnProps) {

  const csss = {
    button1: 'bg-white py-4 px-3 flex justify-center items-center cursor-pointer transition-all duration-300 text-black hover:bg-neutral-300 w-full rounded-full',
    button2: 'bg-white py-4 px-3 flex justify-center items-center cursor-pointer transition-all duration-300 text-black hover:bg-neutral-300 w-full rounded-full',
    submit: 'bg-green-500 py-4 px-3 flex justify-center items-center cursor-pointer transition-all duration-300 text-black hover:bg-green-700 w-full rounded-full',
    back: 'bg-red-900 flex gap-2 justify-center items-center text-neutral-300 py-3 px-8 cursor-pointer transition-all duration-300 text-black hover:bg-neutral-800 rounded-full'
  }

  return (
    <button
      className={`${csss[tip || 'button1']} ${className}`}

      {...props}
    >
      {children}
    </button>
  )
}
