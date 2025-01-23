import React, { useEffect, useState } from 'react'
import { useDispatch,} from 'react-redux';
import { setQuery } from '../store/searchSlice';
import {useNavigate} from "react-router"

function Header() {
    const [search,setSearch]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const searchQuestion=()=>{
        if(!search){
            return ;
        }
        dispatch(setQuery(search));
        navigate('/questions/page/1');
        setSearch("");
        
    }
    
  return (
    <div className='flex justify-center mt-4'>
      <input 
      type='text'
      placeholder='search questions'
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      className='w-[20rem] sm:w-[30rem] outline-none px-2 py-1 rounded-md'
      />
      <button className='bg-green-400 rounded-md px-1' onClick={searchQuestion}>seach</button>
    </div>
  )
}

export default Header
