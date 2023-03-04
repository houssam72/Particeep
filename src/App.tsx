import React from "react";
import "./App.css";
import Logo from "./components/Logo/Logo";
import Cardlist from "./screens/CardList.js/Cardlist";

function App() {
  return (
    <div className="MyBgC">
      <div>
        <Logo />
        <Cardlist />
      </div>
    </div>
  );
}

export default App;
