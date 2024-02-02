import { useState, useEffect, useRef } from "react"

export default function Loading() {
  const loading = useRef(null)
  const [ message, setMessage ] = useState('Loading')

  useEffect(() => {
    loading.current.showModal()
    const animateMessage = setInterval(() => {
      setMessage(message => [message, '.'].join(''))
    }, 300)
    return () => clearInterval(animateMessage)
  })

  return (
    <dialog ref={loading} className="bg-transparent">
      <p className="text-2xl">{ message }</p>
    </dialog> 
  )
}

