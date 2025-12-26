import React from 'react'

export default function Loading() {

    const CardLoading = () => {
        return(
            <div className='w-full h-[200px] bg-neutral-700 animate-pulse rounded-2xl'>
               
            </div>
        )
    }

  return (
    <div className='flex flex-col gap-2'>
        <CardLoading/>
        <CardLoading/>
        <CardLoading/>
    </div>
  )
}
