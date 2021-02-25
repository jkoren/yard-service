// StreetITile.js
import React from "react"

const StreetTile = (props) => {
  return (
    <div>
      <a id={props.street.id} onClick={props.handleStreetNameClick}>
        {props.street.name}
      </a>
    </div>
  )
}

export default StreetTile