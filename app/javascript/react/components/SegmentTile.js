// SegmentTile.js
import React from "react"

const SegmentTile = (props) => {
  return (
    <div>
      <a id={props.segment.id} onClick={props.handleSegmentNumberClick}>
        Zone:{props.segment.zone_number} - 
        Addresses:
        {props.segment.lowest_num_on_segment}-{props.segment.highest_num_on_segment}
      </a>
    </div>
  )
}

export default SegmentTile