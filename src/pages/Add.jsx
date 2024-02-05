import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { ElInput, ElFile, ElDatetime, ElButton } from '../components/Elements'
import { useCommon } from '../context/CommonContext';

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc } from "firebase/firestore";
import { db, storage } from '../firebase/firebase'

function getNow() {
  const offset = new Date().getTimezoneOffset() * 60000
  const [ date, time ] = new Date(Date.now() - offset).toISOString().split('T')

  return {
    date,
    time: time.split('.').at(0)
  }
}

export default function CreateData() {
  const navigate = useNavigate()

  const common = useCommon()
  const [params, setParams] = useState({
    date: getNow().date,
    time: getNow().time,
    amount: 0,
    memo: '',
  })
  const [file, setFile] = useState({})

  function handleFile(e) {
    setFile(() => e.target.files[0])
  }

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
      common.alert('fuck you')
      return
    }
    try {
      const setDataRef = doc(collection(db, "usageHistory"))
      let imageURL = ''
      if (file.name) {
        const storageRef = ref(storage, `receipt/${setDataRef.id}.${file.name.split('.').at(-1)}`);
        await uploadBytes(storageRef, file)
        imageURL = await getDownloadURL(storageRef)
      }
      await setDoc(setDataRef, {
        ...params,
        datetime: `${params.date}T${params.time}`,
        imageURL
      })
      navigate('/')
      common.showToast('추가되었습니다.')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="p-4 bg-gray-200">
      <h3 className="title">추가</h3>
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
        <ElFile label="영수증" onInput={handleFile}/>
      </div>
      <div className="flex justify-center">
        <ElButton onClick={addData}>추가</ElButton>
      </div>
    </div>
  )
}
