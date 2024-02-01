import { useState, useEffect } from 'react'

import { collection, getDocs, addDoc } from "firebase/firestore";
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
        [type]: type === 'amount' ? +e.target.value : e.target.value
      }
    })
  }

  async function addData() {
    if (!Object.values(params).every(value => value !== '')) {
      alert('fuck you')
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
    <div className="p-2 bg-gray-200">
      <h3>Add</h3>
      <div className="input-wrap">
        <label htmlFor="">datetime</label>
        <input type="date" value={params.date} onInput={(e) => handleInput(e, 'date')}/>
        <input type="time" step="1" value={params.time} onInput={(e) => handleInput(e, 'time')}/>
      </div>
      <div className="input-wrap">
        <label htmlFor="">amount</label>
        <input type="number" value={params.amount} onInput={(e) => handleInput(e, 'amount')}/>
      </div>
      <div className="input-wrap">
        <label htmlFor="">memo</label>
        <input type="text" value={params.memo} onInput={(e) => handleInput(e, 'memo')}/>
      </div>
      <div className="btn-wrap">
        <button onClick={addData}>add</button>
      </div>
    </div>
  )
}

function ListItem({ data }) {
  return (
    <div>
      <p>{ data.date }</p>
      <p>{ data.time }</p>
      <p>{ data.amount }</p>
      <p>{ data.memo }</p>
    </div>
  )
}

function App() {
  const [ data, setData ] = useState([])

  useEffect(() => {
    const data = []
    getDocs(collection(db, "usageHistory"))
      .then(res => {
        res.forEach(item => {
          data.push({id: item.id, ...item.data()})
        })
        setData(data)
      })
  }, [])
  
  return (
    <main className="container mx-auto bg-gray-100">
      <h3>List</h3>
      {
        data.map(datum => {
          return <ListItem key={Math.random() * Math.random()} data={datum} />
        })
      }
      {
        data.length && <p>Total : {data.reduce((a, b) => a.amount + b.amount)}원</p>
      }
      <CreateData />
    </main>
  )
}

export default App
