import React from "react";


const DescriptionComponent = () => (
  <section className="description-container">
    <div>
      <div className="container-med">
        <div className="small-caps">LISTEN, TOGETHER</div>
        <div><strong><h1>Slockify brings music lovers together through live community chat and collaborative playlists</h1></strong></div>
        <div>Whether you are a musician or a music lover, collaborative playlist channels and live chat allow you to share your music.</div>
        <div>
          <a href="https://github.com/drice89"><button className="cta-button">LEARN MORE</button></a>
          <a href="mailto:dillon.m.rice@gmail.com">< button className="cta-button cta-inverse">CONTACT US</button></a>
        </div>
      </div>
        <div className="container-med">
        <img className="img-hero" src={window.imageHero} />
        </div>
    </div>
    <div className="container-large">
      <div><h1>Break out of Music Forums</h1></div>
      <div><span>Collaborating and communicating in channels allows for real time distribution and discussion of new music</span></div>
      <div><iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/Hw30__NzVTc?controls=0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe></div>
    </div>
  </section>
)

export default DescriptionComponent;

