import { createContext, useContext, useState } from "react";
import { Confirm, Alert } from "../components/Dialog";
import Loading from "../components/Loading";

const CommonContext = createContext()

export function CommonProvider({ children }) {
  const [loading, setLoading] = useState(false)
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
    <CommonContext.Provider value={{ confirm, alert, setLoading }}>
      { children }
      { renderDialog() }
      { loading && <Loading />}
    </CommonContext.Provider>
  )
}

export function useCommon() {
  return useContext(CommonContext)
}