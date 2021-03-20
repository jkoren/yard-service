//About.js
import React from "react"
const About = () => {
  return (
    <div className="grid-container">
      Yard Service is a responsive web application to help residents understand the collection service provided by the city, adjusting for seasons and holidays.  Yard Service simplifies the combination of maps and calendars provided previously.
      <br></br>

      Example Addresses for Demo Scenarios:
      <li>"Abbott" - A simple lookup</li>
      <li>"Grove" - There are 3 streets with Grove in the name</li>
      <li>"Trapelo" - A long road that goes through multiple zones</li>
      <br></br>
      Also works in a mobile browser.
      <br></br>
      Yard Service provides information on over 20,000 address and 742 street segments.
      <br></br>
      <img src="https://jkorenstein-production.s3.amazonaws.com/yard-service/Yard-Service-Mobile.png" height="130"/> 

    </div>
  )
}

export default About