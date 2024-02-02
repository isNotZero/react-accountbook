export function ElInput({ type, label, value, onInput }) {
  return (
    <div className="flex justify-between p-4 bg-gray-300 rounded">
      <label htmlFor="">{ label }</label>
      <input className="rounded border-solid border border-gray-900" type={type || 'text'} value={ value } onInput={ onInput }/>
    </div>
  )
}

export function ElCheck({ label, checked, onInput }) {
  return (
    <div>
      <label htmlFor="">{ label }</label>
      <input type="checkbox" checked={checked} onInput={ onInput }/>
    </div>
  )
}

export function ElRadio({ label, checked, onInput }) {
  return (
    <div>
      <label htmlFor="">{ label }</label>
      <input type="radio" checked={checked} onInput={ onInput }/>
    </div>
  )
}

export function ElDatetime({ label, date, time, onInputDate, onInputTime }) {
  return (
    <div className="flex justify-between p-4 bg-gray-300 rounded">
      <label htmlFor="">{ label }</label>
      <div className="flex gap-x-4">
        <input className="rounded border-solid border border-gray-900" type="date" value={ date } onInput={ onInputDate }/>
        <input className="rounded border-solid border border-gray-900" type="time" step="1" value={ time } onInput={ onInputTime }/>
      </div>
    </div>
  )
}

export function ElButton({ children, onClick }) {
  return <button className="px-4 rounded min-h-6 bg-blue-500 text-white text-sm transition-all hover:bg-blue-600" onClick={onClick}>{ children }</button>
}