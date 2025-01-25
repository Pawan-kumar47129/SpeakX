import React from 'react'

function Loading() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="w-[60px] h-[60px] border-b-4 border-red-500 rounded-full animate-spin">
      </div>
    </div>
  )
}

export default Loading