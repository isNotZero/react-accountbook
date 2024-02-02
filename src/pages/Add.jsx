import { useState } from 'react'
import { ElInput, ElDatetime, ElButton } from '../components/Elements'
import { useDialog } from '../context/DialogContext';

import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase/firebase'

function getNow() {
  const offset = new Date().getTimezoneOffset() * 60000
  const [ date, time ] = new Date(Date.now() - offset).toISOString().split('T')

  return {
    date,
    time: time.split('.').at(0)
  }
}

export default function CreateData() {
  const dialog = useDialog()
  const [params, setParams] = useState({
    date: getNow().date,
    time: getNow().time,
    amount: 0,
    memo: ''
  })

  function handleInput(e, type) {
    setParams(params => {
      return {
        ...params,
        [type]: e.target.value
      }
    })
  }

  async function addData() {
    if (!Object.values(params).every(value => value !== '')) {
      dialog.alert('fuck you')
      return
    }
    try {
      await addDoc(collection(db, "usageHistory"), {
        ...params,
        datetime: `${params.date}T${params.time}`
      })
      dialog.alert('추가되었습니다.')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="p-4 bg-gray-200">
      <h3 className="title">추가</h3>
      <div className="flex flex-col gap-y-4">
        <ElDatetime
          label="datetime"
          date={params.date}
          time={params.time}
          onInputDate={(e) => handleInput(e, 'date')}
          onInputTime={(e) => handleInput(e, 'time')}
        />
        <ElInput label="amount" value={params.amount} onInput={(e) => handleInput(e, 'amount')}/>
        <ElInput label="memo" value={params.memo} onInput={(e) => handleInput(e, 'memo')}/>
      </div>
      <div className="flex justify-center">
        <ElButton onClick={addData}>add</ElButton>
      </div>
    </div>
  )
}
