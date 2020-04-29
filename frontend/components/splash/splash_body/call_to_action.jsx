import React from "react";
import { Link } from "react-router-dom"

const CallToAction = () => (
  <section className="cta-section">
    <div className="description-container">
      <div className="container-large">
        <div><h1>Choose a better way to share music</h1></div>
        <div>
          <Link to="/signup"><button className="cta-button">TRY SLOCKIFY</button></Link>
          <a href="mailto:dillon.m.rice@gmail.com"><button className="cta-button cta-inverse">CONTACT US</button></a>
        </div>
      </div>
    </div>
  </section>
)

export default CallToAction;