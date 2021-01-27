import { useState, useRef } from "react";
import { Body } from "./body/Body";
import { Nav } from "./nav/Nav";
import routes from "./routes";
import "./App.css";

function App() {
  const [selected, setSelected] = useState("about");

  const setPageSelection = (page) => {
    setSelected(page);
  };

  return (
    <div className="page" onScroll={(event) => console.log("here", event)}>
      <Nav selected={selected} setSelected={setPageSelection} />
      <Body pageToRender={<h2>Hello</h2>} />
    </div>
  );
}

export default App;
