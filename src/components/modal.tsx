import React from 'react'

export default function Modal({children}: {children?: React.ReactNode}) {
  return (
    <div className='fixed w-screen h-screen bg-black/50 backdrop-blur-sm z-[9999] top-0 left-0 flex justify-center items-center'>
        <div className='bg-neutral-900 p-6 rounded-2xl shadow-lg w-fit h-fit flex flex-col gap-4'>
            {children}
        </div>
    </div>
  )
}
