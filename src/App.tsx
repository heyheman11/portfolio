import { useMemo, useRef, useState, useCallback, useEffect } from "react";
import { Body } from "./body/Body";
import { Nav } from "./nav/Nav";
import routes from "./routes";
import "./App.css";
import { useWindowDimensions } from "./hooks";

const MOBILE_WIDTH_BREAKPOINT = 800;

function App() {
  const [selected, setSelected] = useState(routes[0].name);
  const [width] = useWindowDimensions();
  const pageRef = useRef(null);
  const [layout, setLayout] = useState<"desktop" | "mobile">("desktop");
  const [isMobileNavActive, setIsMobileNavActive] = useState(false);

  const navRoutes = useMemo(() => {
    return routes.map((route) => route.name);
  }, []);

  const setPageSelection = useCallback((page: "About" | "Resume") => {
    if (page === "About") {
      document.documentElement.style.setProperty("--bg-colour-1", "#536976");
      document.documentElement.style.setProperty("--bg-colour-2", "#292e49");
    }
    if (page === "Resume") {
      document.documentElement.style.setProperty("--bg-colour-1", "#ab3827");
      document.documentElement.style.setProperty("--bg-colour-2", "#bbcf26");
    }
    setSelected(page);
  }, []);

  useEffect(() => {
    if (width <= MOBILE_WIDTH_BREAKPOINT) {
      setLayout("mobile");
    } else {
      setLayout("desktop");
      if (isMobileNavActive) {
        setIsMobileNavActive(false);
      }
    }
  }, [width, isMobileNavActive]);

  const handleMobileNavToggle = (toggle: boolean) => {
    setIsMobileNavActive(toggle);
  };

  return (
    <div className="page" ref={pageRef}>
      {layout === "mobile" && isMobileNavActive && (
        <div className="mobile-nav-wrapper">
          <Nav
            pageRef={pageRef}
            routes={navRoutes}
            setSelected={setPageSelection}
          />
          <button onClick={() => setIsMobileNavActive(false)}>X</button>
        </div>
      )}
      {layout === "desktop" && (
        <Nav
          pageRef={pageRef}
          routes={navRoutes}
          setSelected={setPageSelection}
        />
      )}
      <Body
        pageRef={pageRef}
        PageToRender={routes.find((item) => item.name === selected)?.component}
        layout={layout}
        handleMobileNavToggle={handleMobileNavToggle}
      />
    </div>
  );
}

export default App;
