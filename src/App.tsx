import { useRef } from "react";
import { Body } from "./body/Body";
import { Nav } from "./nav/Nav";
import routes from "./routes";
import "./App.css";

function App() {
  // const [selected, setSelected] = useState(routes[0].name);
  const pageRef = useRef(null);

  // const navRoutes = useMemo(() => {
  //   return routes.reduce((accum, nextValue) => [...accum, nextValue.name], []);
  // }, []);

  // const setPageSelection = (page) => {
  //   if (page === "About") {
  //     document.documentElement.style.setProperty("--bg-colour-1", "#536976");
  //     document.documentElement.style.setProperty("--bg-colour-2", "#292e49");
  //   }
  //   if (page === "Resume") {
  //     document.documentElement.style.setProperty("--bg-colour-1", "#ab3827");
  //     document.documentElement.style.setProperty("--bg-colour-2", "#bbcf26");
  //   }
  //   setSelected(page);
  // };

  return (
    <div className="page" ref={pageRef}>
      <Nav pageRef={pageRef} />
      <Body pageRef={pageRef} PageToRender={routes[0].component} />
    </div>
  );
}

export default App;
