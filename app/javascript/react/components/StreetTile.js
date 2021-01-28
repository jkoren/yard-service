// StreetTile.js
import React from "react"
import { Link } from "react-router-dom";

const StreetTile = (props) => {
  return (
    <div>
      {props.street.name}
    </div>
  )
}

export default StreetTile