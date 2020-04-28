import React from "react";
import NavContainer from "./nav/nav_container";
import CallToAction from "./splash_body/call_to_action";
import DescriptionComponent from "./splash_body/description_component";
import ChannelsDescription from "./splash_body/channels_description";
import MarketingMessage from "./splash_body/marketing_message";
import FooterComponent from "./splash_body/footer_component";


const SplashMain = () => (
  <div>
    <NavContainer />
    <div className="main">
      <DescriptionComponent/>
      <ChannelsDescription />
      <MarketingMessage />
      <CallToAction />
      <FooterComponent />
    </div>
  </div>
)

export default SplashMain;