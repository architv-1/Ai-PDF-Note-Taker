
import React from 'react'
import SideBar from './_components/SideBar'
import Header from './_components/Header'

function Layout({children}) {
  return (
    <div>
        <div className="md:w-65 h-screen fixed ">
            <SideBar/>
            
        </div>
      <div className="md:ml-65">
        <Header/>
        <div className="p-10">
          {children}
        </div>
        
      </div>
    </div>
  )
}

export default Layout
