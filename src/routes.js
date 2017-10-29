import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { landing, chatroom } from "./component";

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={landing} />
      <Route exact path="/chatroom" component={chatroom} />
    </div>
  </Router>
);

export default Routes;
