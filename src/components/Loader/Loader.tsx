import React from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";

import "./Loader.css";

const LoaderAnimation = () => (
  <Segment>
    <Dimmer active>
      <Loader />
    </Dimmer>
  </Segment>
);

export default LoaderAnimation;
