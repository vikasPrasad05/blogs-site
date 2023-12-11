import React from 'react'
import spinner from '../assets/svg/spinner.svg'

function Spinner() {
  return (
    <div className="flex items-center justify-center h-screen bg-black bg-opacity-20">
        <div className="text-center">
            <img src={spinner} alt="Loading..." className='h-32 ' />
        </div>
    </div>
  )
}

export default Spinner