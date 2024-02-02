import { useState, useEffect } from 'react'
import { useCommon } from '../context/CommonContext';
import { useNavigate } from 'react-router-dom';

import { ElButton } from '../components/Elements'
import HistoryItem from '../components/HistoryItem'

import { doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { db } from '../firebase/firebase'

export default function App() {
  const [ data, setData ] = useState([])
  const common = useCommon()
  const navigate = useNavigate()

  useEffect(readAllData, [])
  
  function readAllData() {
    common.setLoading(true)
    const data = []
    getDocs(collection(db, "usageHistory"))
      .then(res => {
        res.forEach(item => {
          data.push({id: item.id, ...item.data()})
        })
        setData(data)
        common.setLoading(false)
      })
  }

  async function deleteData(id) {
    if (await common.confirm('삭제하시겠습니까?')) {
      await deleteDoc(doc(db, "usageHistory", id))
      await common.alert('삭제되었습니다.')
      readAllData()
    }
  }
  function onClickModifyBtn(id) {
    navigate('/modify', { state: { id }})
  }

  function processData() {
    return data.sort((a, b) => {
      const before = +`${a.date.split('-').join('')}${a.time.split(':').join('')}`
      const after = +`${b.date.split('-').join('')}${b.time.split(':').join('')}`
      return after - before
    })
  }
  
  function renderList() {
    return processData().map(datum => {
      return <HistoryItem key={datum.id} data={datum} onClickModifyBtn={() => onClickModifyBtn(datum.id)} onClickDeleteBtn={deleteData}/>
    })
  }
  return (
    <>
      <div className="flex justify-between">
        <h3 className="title">내역</h3>
        <ElButton onClick={() => navigate('/add')}>추가</ElButton>
      </div>
      <p>Total : {data.reduce((a, b) => {
        return {amount: +a.amount + +b.amount}
      }, {amount: '0'}).amount} 원</p>
      <dl className="flex flex-col gap-y-4 p-4 bg-gray-100">
        { renderList() }
      </dl>
    </>
  )
}
