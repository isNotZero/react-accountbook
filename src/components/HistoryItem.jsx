import { ElButton } from "./Elements"

export default function HistoryItem({ data, onClickModifyBtn, onClickDeleteBtn }) {
  return (
    <div className="history-item">
      <dd className="date">{ new Date(`${data.date}T${data.time}`).toLocaleString() }</dd>
      <div className="history">
        <dd>{ data.memo }</dd>
        <dt className={data.amount > 0 ? 'text-blue-500' : 'text-red-500'}>
          <strong>{ data.amount }</strong> 원
        </dt>
      </div>
      <div className="flex basis-full justify-end gap-x-4 mt-2">
        <ElButton onClick={onClickModifyBtn}>수정</ElButton>
        <ElButton onClick={() => onClickDeleteBtn(data.id)}>삭제</ElButton>
      </div>
    </div>
  )
}