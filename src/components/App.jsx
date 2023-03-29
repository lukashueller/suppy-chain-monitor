import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Modeler from "./pages/Modeler/Modeler";
import Error from "./pages/Error/Error";

import "./App.css";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} exact />
      <Route path="/modeler" element={<Modeler />} />
      <Route path="*" element={<Error />} />
      {/* <Route path="/somethingwithId/:id" element={somethingwithId} /> */}
    </Routes>
  </BrowserRouter>
);

export default App;
