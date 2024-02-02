import { createContext, useContext, useState } from "react";
import { Confirm, Alert } from "../components/Dialog";
import Loading from "../components/Loading";
import Toast from "../components/Toast";

const CommonContext = createContext()

export function CommonProvider({ children }) {
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(false)

  const [message, setMessage] = useState('')
  const [dialog, setDialog] = useState({
    type: '',
  })
  const [result, setResult] = useState({
    resolve: null,
    reject: null
  })

  function showToast(msg) {
    setMessage(msg)
    setToast(true)
    setTimeout(() => {
      setToast(false)
    }, 1500)
  }

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
    switch(dialog.type) {
      case 'confirm': {
        return (
          <Confirm
            message={message}
            result={result}
            serResult={setResult}
          />
        )
      }
      case 'alert': {
        return (
          <Alert
            message={message}
            result={result}
            serResult={setResult}
          />
        )
      }
    }
  }
  
  return (
    <CommonContext.Provider value={{ confirm, alert, setLoading, showToast }}>
      { children }
      { renderDialog() }
      { loading && <Loading />}
      { toast && <Toast /> }
    </CommonContext.Provider>
  )
}

export function useCommon() {
  return useContext(CommonContext)
}