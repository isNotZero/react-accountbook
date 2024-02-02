import { useState, useEffect } from 'react'
import { ElInput, ElDatetime, ElButton } from './components/Elements'
import { useDialog } from './context/DialogContext';
import HistoryItem from './components/HistoryItem'

import { doc, collection, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import { db } from './firebase/firebase'

function getNow() {
  const offset = new Date().getTimezoneOffset() * 60000
  const [ date, time ] = new Date(Date.now() - offset).toISOString().split('T')

  return {
    date,
    time: time.split('.').at(0)
  }
}

function CreateData() {
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
      alert('complete')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="p-4 bg-gray-200">
      <h3 className="title">Add</h3>
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

function App() {
  const [ data, setData ] = useState([])
  const dialog = useDialog()

  useEffect(readAllData, [])
  
  function readAllData() {
    const data = []
    getDocs(collection(db, "usageHistory"))
      .then(res => {
        res.forEach(item => {
          data.push({id: item.id, ...item.data()})
        })
        setData(data)
      })
  }

  async function deleteData(id) {
    if (await dialog.confirm('삭제하시겠습니까?')) {
      await deleteDoc(doc(db, "usageHistory", id))
      await dialog.alert('삭제되었습니다.')
      readAllData()
    }
  }

  function filteredData() {
    return data
  }
  function sortedData() {
    return data.sort((a, b) => {
      return +b.date.split('-').join('') - +a.date.split('-').join('')
    })
  }

  function processData() {

  }

  return (
    <main className="container mx-auto">
      <h3 className="title">List</h3>
      <dl className="flex flex-col gap-y-4 p-4 bg-gray-100">
        {
          sortedData().map(datum => {
            return <HistoryItem key={datum.id} data={datum} onClickDeleteBtn={deleteData}/>
          })
        }
      </dl>
      <p>Total : {data.reduce((a, b) => {
        return {amount: +a.amount + +b.amount}
      }, {amount: '0'}).amount} 원</p>
      <CreateData />
    </main>
  )
}

export default App
