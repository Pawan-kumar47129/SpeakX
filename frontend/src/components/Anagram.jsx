import React from 'react'
import { useSelector } from 'react-redux';

function Anagram({ques,idx}) {
    const {currentPage}=useSelector(state=>state.search)
    let quesNo=(idx+1)+(currentPage-1)*10;
    return (
    <div className='flex flex-col gap-y-2'>
      <h3 className='font-bold'>Ques{quesNo}{": " + ques.title}</h3>
      <div className='grid gap-2 md:grid-cols-2 lg:grid-cols-4'>
        {ques.blocks && ques.blocks.map((block,idx)=>(
            <p key={idx}><span className=' font-medium'>{String.fromCharCode(idx+65) + ": " }</span>{block.text}</p>
        ))}
      </div>
    </div>
  )
}

export default Anagram