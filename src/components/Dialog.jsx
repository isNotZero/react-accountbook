import { useEffect, useRef } from "react"
import { ElButton } from "./Elements"

export function Confirm({ message, result, setResult }) {
  const dialog = useRef(null)

  useEffect(() => {
    dialog.current.showModal()
  })

  function cancel() {
    result.resolve(false)
    dialog.current.close()
  }

  function confirm() {
    result.resolve(true)
    dialog.current.close()
  }
  
  return (
    <dialog ref={dialog} className="w-1/3 p-4 rounded">
      <div className="flex justify-center">
        { message }
      </div>
      <div className="flex justify-center gap-x-4 mt-4">
        <ElButton onClick={cancel}>취소</ElButton>
        <ElButton onClick={confirm}>확인</ElButton>
      </div>
    </dialog> 
  )
}

export function Alert({ message, result, setResult }) {
  const dialog = useRef(null)

  useEffect(() => {
    dialog.current.showModal()
  })

  function confirm() {
    result.resolve(true)
    dialog.current.close()
  }
  
  return (
    <dialog ref={dialog} className="w-1/3 p-4 rounded">
      <div className="flex justify-center">
        { message }
      </div>
      <div className="flex justify-center gap-x-4 mt-4">
        <ElButton onClick={confirm}>확인</ElButton>
      </div>
    </dialog> 
  )
}