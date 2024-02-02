import { useEffect, useRef } from "react"

export default function Loading() {
  const loading = useRef(null)

  useEffect(() => {
    loading.current.showModal()
  })

  return (
    <dialog ref={loading}>
      loading...
    </dialog> 
  )
}

