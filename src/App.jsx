import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./layouts/Footer";
import Home from "./pages/Home";
import TopMenu from "./layouts/TopMenu";

function App() {
  return (
    <Router>
      <main>
        <TopMenu />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
