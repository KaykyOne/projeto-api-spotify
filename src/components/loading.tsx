import React from 'react'

type Props = {
  type: "simple" | "bone"
  number?: number
}

export default function Loading({ type = 'simple', number = 1 }: Props) {

  const CardLoading = () => {
    return (
      type == "bone" ?
        (<div className='w-full h-[100px] bg-neutral-700 animate-pulse rounded-2xl'></div>)
        : (<div className="animate-spin border-l-2 border-neutral-500 rounded-full h-6 w-6"></div>)
    )
  }

  return (
    <div className='flex flex-col gap-2'>
      {Array.from({length:number}).map((_, i) => (
        <CardLoading key={i} />
      ))}
    </div>
  )
}
