import React from 'react'

// Generic modal component with overlay backdrop and blur efect
export default function Modal({children}: {children?: React.ReactNode}) {
  return (
    // Modal container - fixed overlay with semi-transparent black background and blur
    <div className='fixed w-screen h-screen bg-black/50 backdrop-blur-sm z-[9999] top-0 left-0 flex justify-center items-center p-4'>
        {/* Modal content wrapper - dark styled box with shadow and rounded corners */}
        <div className='bg-neutral-900 p-6 rounded-2xl shadow-lg w-fit h-fit flex flex-col gap-4'>
            {children}
        </div>
    </div>
  )
}
