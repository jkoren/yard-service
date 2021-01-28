import React from 'react'
import { Route, Switch } from "react-router-dom";
import SearchContainer from "./SearchContainer"
const Layout = (props) => {
  return ( 
    <Switch>
      <Route exact path="/" component={SearchContainer}/>  
    </Switch>
  )
}

export default Layout