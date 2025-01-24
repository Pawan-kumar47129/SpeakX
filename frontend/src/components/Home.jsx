import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router'

function Home() {
  return (
    <div>
      <Header/>
      <div className='mt-[80px]'>
      <Outlet/>
      </div>
    </div>
  )
}

export default Home
