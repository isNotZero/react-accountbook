import { createContext, useContext, useState } from "react";
import { Confirm, Alert } from "../components/Dialog";

const DialogContext = createContext()

export function DialogProvider({ children }) {
  const [message, setMessage] = useState('')
  const [dialog, setDialog] = useState({
    type: '',
  })
  const [result, setResult] = useState({
    resolve: null,
    reject: null
  })
  
  function confirm(msg) {
    setMessage(msg)
    setDialog({type: 'confirm'})
    return new Promise((resolve, reject) => {
      setResult({resolve, reject})
    })
  }
  
  function alert(msg) {
    setMessage(msg)
    setDialog({type: 'alert'})
    return new Promise((resolve, reject) => {
      setResult({resolve, reject})
    })
  }

  function renderDialog() {
  }
  
  return (
    <DialogContext.Provider value={{ confirm, alert }}>
      { children }
      {
        dialog.type === 'confirm' &&
        <Confirm
          message={message}
          result={result}
          serResult={setResult}
        />
      }
      {
        dialog.type === 'alert' &&
        <Alert
          message={message}
          result={result}
          serResult={setResult}
        />
      } 
    </DialogContext.Provider>
  )
}

export function useDialog() {
  return useContext(DialogContext)
}