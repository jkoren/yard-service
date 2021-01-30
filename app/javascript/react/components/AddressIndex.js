// AddressIndex.js
import React from "react"
import { Link } from "react-router-dom";

const AddressIndex = (props) => {
  const addressTiles = props.addresses.map((address) => {
    return (
      <div>
        {address.id}{address.number}{address.segment.street.name}
      </div>
      )
    })

  return (
    <div>
      {addressTiles}
    </div>
  )
}

export default AddressIndex