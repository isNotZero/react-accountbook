import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

import { ElInput, ElDatetime, ElButton } from '../components/Elements'
import { useCommon } from '../context/CommonContext';

import { doc, getDoc, updateDoc } from "firebase/firestore";
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
  const { id } = useLocation().state
  const navigate = useNavigate()

  const common = useCommon()
  const [params, setParams] = useState({
    date: getNow().date,
    time: getNow().time,
    amount: 0,
    memo: ''
  })
  
  useEffect(() => {
    common.setLoading(true)
    getDoc(doc(db, "usageHistory", id))
      .then(res => {
        setParams(res.data())
        common.setLoading(false)
      })
  }, [])

  function handleInput(e, type) {
    setParams(params => {
      return {
        ...params,
        [type]: e.target.value
      }
    })
  }

  async function updateData() {
    if (!Object.values(params).every(value => value !== '')) {
      common.alert('fuck you')
      return
    }
    try {
      await updateDoc(doc(db, "usageHistory", id), {
        ...params,
        datetime: `${params.date}T${params.time}`
      })
      navigate('/')
      common.showToast('수정되었습니다.')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="p-4 bg-gray-200">
      <h3 className="title">수정</h3>
      <div className="flex flex-col gap-y-4">
        <ElDatetime
          label="날짜"
          date={params.date}
          time={params.time}
          onInputDate={(e) => handleInput(e, 'date')}
          onInputTime={(e) => handleInput(e, 'time')}
        />
        <ElInput label="금액" value={params.amount} onInput={(e) => handleInput(e, 'amount')}/>
        <ElInput label="메모" value={params.memo} onInput={(e) => handleInput(e, 'memo')}/>
        {
          params.imageURL && <img src={params.imageURL} alt="" className="block w-1/6 h-1/6" />
        }
      </div>
      <div className="flex justify-center">
        <ElButton onClick={updateData}>수정</ElButton>
      </div>
    </div>
  )
}
