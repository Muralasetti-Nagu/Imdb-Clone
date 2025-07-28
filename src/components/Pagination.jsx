import React from 'react'

function Pagination({handlePrev, handleNext, pageNo}) {
  return (
    <div className='bg-gray-400 p-4 mt-8 flex items-center justify-center'>
        <div>
            <span onClick={handlePrev} className='px-8'><i class="fa-solid fa-arrow-left"></i></span>
            <span className='font-bold'>{pageNo}</span>
            <span onClick={handleNext} className='px-8'><i class="fa-solid fa-arrow-right"></i></span>
        </div>
    </div>
  )
}

export default Pagination