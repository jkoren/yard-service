// App.js
import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Layout from "./Layout";
import About from "./About";

const App = (props) => {
  return (
    <BrowserRouter>
      <Route path="/" component={Layout} />
      <Route path="/about" component={About} />
    </BrowserRouter>
  )
}

export default App