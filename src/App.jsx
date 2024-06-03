import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BalanceBox from './components/BalanceBox'
import HistoryBox from './components/History'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BalanceBox/>
    </>
  )
}

export default App
