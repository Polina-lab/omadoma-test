import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./layouts/Footer";
import Home from "./pages/Home";
import TopMenu from "./layouts/TopMenu";
import DevOverlay from "./components/DevOverlay";

import Privaatsuspoliitika from "./pages/legal/Privaatsuspoliitika";
import Kupsised from "./pages/legal/Kupsised";
import Kasutustingimused from "./pages/legal/Kasutustingimused";



function App() {

const [activeService, setActiveService] = useState(null);

  return (
    <Router>
      <DevOverlay />
      <main>
        <TopMenu />
        <Routes>
          <Route path="/" element={<Home
                activeService={activeService}
                setActiveService={setActiveService}
              />} />
          <Route path="/privacy" element={<Privaatsuspoliitika />} />
          <Route path="/cookies" element={<Kupsised />} />
          <Route path="/terms" element={<Kasutustingimused />} />
        </Routes>
      </main>
      <Footer setActiveService={setActiveService}/>
    </Router>
  );
}

export default App;
