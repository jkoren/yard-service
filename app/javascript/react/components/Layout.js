import React from 'react'

const Layout = (props) => {
  return ( 
    <div className="grid-x">
      <h1>Make It So React</h1>
      <div className="medium-offset-3 medium-6 text-center"> <br></br>
        <img src="https://jkorenstein-production.s3.amazonaws.com/yard-service/map.png" height="130"/> 
        <form action="/streets" method="get"> 
          <label>Street</label>
          <input name="street" type="text"></input>
          <input name="Search" type="submit"></input>
        </form>
      </div>
  </div>
  
  )
}

export default Layout