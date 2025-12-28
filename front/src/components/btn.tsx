import React from 'react'

// Define button style options - submit, cancel, or default button1 style
type tips = 'button1' | 'cancel' | 'submit' | undefined

// Props interface for customizable button component with optional styling tips
type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode
  className?: string
  tip?: tips
}

// Reusable button component with diferent visual styles based on tip prop
export default function Btn({ children, className, tip, ...props }: BtnProps) {

  // CSS styles mappings for diferent button variants - applies Tailwind classes dynamicly
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
