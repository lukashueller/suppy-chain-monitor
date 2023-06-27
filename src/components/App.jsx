import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";

import Home from "./pages/Home/Home";
import ListOverview from "./pages/ListOverview/ListOverview";
import SupplierNetwork from "./pages/SupplierNetwork/SupplierNetwork";
import Error from "./pages/Error/Error";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Downloads from "./pages/Downloads/Downloads";

import "./App.css";

const App = () => (
  <ConfigProvider theme={{ token: { colorPrimary: "#64C094" } }}>
    <BrowserRouter basename="/suppy-chain-monitor">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/list_overview" element={<ListOverview />} />
        <Route path="/network" element={<SupplierNetwork />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="*" element={<Error />} />
        {/* <Route path="/somethingwithId/:id" element={somethingwithId} /> */}
      </Routes>
    </BrowserRouter>
  </ConfigProvider>
);

export default App;
