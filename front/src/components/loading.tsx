import React from 'react'

type Props = {
  type: "simple" | "bone"
  number?: number
  flex?: boolean
  className?: string
}

export default function Loading({ type = 'simple', number = 1, flex = false, className = '' }: Props) {

  const CardLoading = () => {
    return (
      type == "bone" ?
        (<div className={`w-full h-[100px] bg-neutral-700 animate-pulse rounded-2xl ${className}`}></div>)
        : (<div className={`w-full h-full min-h-75 flex justify-center items-center ${className}`}><div className="animate-spin border-l-2 border-neutral-500 rounded-full h-6 w-6"></div></div>)
    )
  }

  return (
    flex ? (
      <div className='flex gap-2'>
        {Array.from({ length: number }).map((_, i) => (
          <CardLoading key={i} />
        ))}
      </div>
    ) : (
      <div className='flex flex-col gap-2'>
        {Array.from({ length: number }).map((_, i) => (
          <CardLoading key={i} />
        ))}
      </div>
    )
    
  )
}
