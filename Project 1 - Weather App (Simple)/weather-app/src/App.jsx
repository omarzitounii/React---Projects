import React from 'react'
import Card from './components/Card'
import Weather from './components/Weather'

function App() {

  return (
    <div className=' min-h-screen flex justify-center items-center bg-gradient-to-b from-blue-100 to-blue-300 p-4 md:p-0'>
      <Card>
        <Weather />
      </Card>
    </div>
  )
}

export default App
