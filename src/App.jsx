import { useState } from 'react'
import './App.css'
import ReactParse from './components/ReactParse'
import GeminiAPI from './components/GeminiAPI'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>ATS RESUME CHECKER</h1>
    <ReactParse/>
    </>
  )
}

export default App
