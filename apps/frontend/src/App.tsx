import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Vite + React</h1>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}

export default App

