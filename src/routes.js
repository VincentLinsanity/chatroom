import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { chatroom } from "./component";

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={chatroom} />
    </div>
  </Router>
);

export default Routes;
