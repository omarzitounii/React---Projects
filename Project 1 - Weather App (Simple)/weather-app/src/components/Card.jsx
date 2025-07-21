import React from 'react'

const Card = ({children}) => {
  return (
    <div className=' bg-gray-600 shadow-xl p-6 sm:p-12 rounded-2xl flex flex-col items-center text-center text-white  w-full max-w-md mx-5'>
      {children}
    </div>
  )
}

export default Card
