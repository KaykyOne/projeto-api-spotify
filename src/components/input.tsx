import React from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &{
  className?: string
}

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={`bg-neutral-900 px-5 py-3 rounded-lg outline-none border border-neutral-800 focus:border-green-500 transition-colors ${className}`}
      {...props}
    />
  )
}
