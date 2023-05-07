import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Modeler from "./pages/Modeler/Modeler";
import SupplierNetwork from "./pages/SupplierNetwork/SupplierNetwork";
import Error from "./pages/Error/Error";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

import "./App.css";

const App = () => (
  <BrowserRouter basename="/suppy-chain-monitor">
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/modeler" element={<Modeler />} />
      <Route path="/network" element={<SupplierNetwork />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Error />} />
      {/* <Route path="/somethingwithId/:id" element={somethingwithId} /> */}
    </Routes>
  </BrowserRouter>
);

export default App;
