export default function Toast({ message }) {
  return (
    <dialog open className="fixed bottom-0 left-0 w-full p-4 bg-red-100">
      <p className="text-2xl">{ message }</p>
    </dialog> 
  )
}

