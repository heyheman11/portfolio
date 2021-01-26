import { useState, useRef } from "react";
import "./App.css";

function Nav({ selected, setSelected }) {
  const getSelected = (page) => {
    if (page === selected) {
      return "currently-selected";
    }
  };

  return (
    <div className="nav">
      <p>
        <button
          className={getSelected("about")}
          onClick={() => setSelected("about")}
        >
          About
        </button>
      </p>
      <p>
        <button
          className={getSelected("projects")}
          onClick={() => setSelected("projects")}
        >
          Projects
        </button>
      </p>
      <p>
        <button
          className={getSelected("resume")}
          onClick={() => setSelected("resume")}
        >
          Resume
        </button>
      </p>
    </div>
  );
}

function App() {
  const [selected, setSelected] = useState("about");
  // const pageRef = useRef(null);

  const setPageSelection = (page) => {
    setSelected(page);
  };

  return (
    <div className="page" onScroll={(event) => console.log('here', event)}>
      <Nav selected={selected} setSelected={setPageSelection} />
    </div>
  );
}

export default App;
