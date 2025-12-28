import React from 'react'

type tips = 'button1' | 'cancel' | 'submit' | undefined

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode
  className?: string
  tip?: tips
}

export default function Btn({ children, className, tip, ...props }: BtnProps) {

  const csss = {
    button1: 'bg-white py-4 flex gap-4 px-3 flex justify-center items-center cursor-pointer transition-all duration-300 text-black hover:bg-neutral-300 w-full rounded-full',
    cancel: 'bg-red-800 py-4 flex gap-4 px-3 flex justify-center items-center cursor-pointer transition-all duration-300 text-white hover:bg-red-700 w-full rounded-full',
    submit: 'bg-green-500 py-4 px-3 flex justify-center items-center cursor-pointer transition-all duration-300 text-black hover:bg-green-700 w-full rounded-full',
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
