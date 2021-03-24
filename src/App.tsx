import { useMemo, useRef, useState } from "react";
import { Body } from "./body/Body";
import { Nav } from "./nav/Nav";
import routes from "./routes";
import "./App.css";

function App() {
  const [selected, setSelected] = useState(routes[0].name);
  const pageRef = useRef(null);

  const navRoutes = useMemo(() => {
    return routes.map((route) => route.name)
  }, []);

  const setPageSelection = (page: "About" | "Resume") => {
    if (page === "About") {
      document.documentElement.style.setProperty("--bg-colour-1", "#536976");
      document.documentElement.style.setProperty("--bg-colour-2", "#292e49");
    }
    if (page === "Resume") {
      document.documentElement.style.setProperty("--bg-colour-1", "#ab3827");
      document.documentElement.style.setProperty("--bg-colour-2", "#bbcf26");
    }
    setSelected(page);
  };

  return (
    <div className="page" ref={pageRef}>
      <Nav pageRef={pageRef} routes={navRoutes} setSelected={setPageSelection} />
      <Body pageRef={pageRef} PageToRender={routes.find((item) => item.name === selected)?.component} />
    </div>
  );
}

export default App;
