import React from 'react'

// Props interface for reusable input component with extended HTML attributes
type InputProps = React.InputHTMLAttributes<HTMLInputElement> &{
  className?: string
}

// Custom input component with dark theme styling and green focus state
export default function Input({ className, ...props }: InputProps) {
  return (
    // Input field with dynamic styling - includes focus state and cutom border colors
    <input
      className={`bg-neutral-900 px-5 py-3 w-full rounded-lg outline-none border border-neutral-800 focus:border-green-500 transition-colors ${className}`}
      {...props}
    />
  )
}
