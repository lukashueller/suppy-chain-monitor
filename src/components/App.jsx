import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Modeler from "./pages/Modeler/Modeler";
import Insights from "./pages/Insights/Insights";
import Error from "./pages/Error/Error";

import "./App.css";

const App = () => (
  <BrowserRouter basename="/suppy-chain-monitor">
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/modeler" element={<Modeler />} />
      <Route path="/insights" element={<Insights />} />
      <Route path="*" element={<Error />} />
      {/* <Route path="/somethingwithId/:id" element={somethingwithId} /> */}
    </Routes>
  </BrowserRouter>
);

export default App;
