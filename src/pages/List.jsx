import { useState, useEffect } from 'react'
import { useDialog } from '../context/DialogContext';

import HistoryItem from '../components/HistoryItem'

import { doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { db } from '../firebase/firebase'

export default function App() {
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

  function processData() {
    return data.sort((a, b) => {
      const before = +`${a.date.split('-').join('')}${a.time.split(':').join('')}`
      const after = +`${b.date.split('-').join('')}${b.time.split(':').join('')}`
      return after - before
    })
  }

  return (
    <>
      <h3 className="title">내역</h3>
      <dl className="flex flex-col gap-y-4 p-4 bg-gray-100">
        {
          processData().map(datum => {
            return <HistoryItem key={datum.id} data={datum} onClickDeleteBtn={deleteData}/>
          })
        }
      </dl>
      <p>Total : {data.reduce((a, b) => {
        return {amount: +a.amount + +b.amount}
      }, {amount: '0'}).amount} 원</p>
    </>
  )
}
