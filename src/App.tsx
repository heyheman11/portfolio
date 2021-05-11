import React, {
  useMemo,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Body } from "./body/Body";
import { Nav } from "./nav/Nav";
import routes from "./routes";
import "./App.css";
import { useWindowDimensions } from "./hooks";

const MOBILE_WIDTH_BREAKPOINT = 800;

function MobileCornerButton({ children }: React.PropsWithChildren<{}>) {
  return <div className="corner-button">{children}</div>;
}

function App() {
  const [selectedPage, setSelectedPage] = useState(routes[0].name);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { values, isResizing } = useWindowDimensions();
  const pageRef = useRef(null);
  const [layout, setLayout] = useState<"desktop" | "mobile">("desktop");
  const [isMobileNavActive, setIsMobileNavActive] = useState(false);

  const navRoutes = useMemo(() => {
    return routes.map((route) => route.name);
  }, []);

  const setPageSelection = useCallback(
    (page: "About" | "Resume") => {
      if (page === "About") {
        document.documentElement.style.setProperty("--bg-colour-1", "#536976");
        document.documentElement.style.setProperty("--bg-colour-2", "#292e49");
      }
      if (page === "Resume") {
        document.documentElement.style.setProperty("--bg-colour-1", "#ab3827");
        document.documentElement.style.setProperty("--bg-colour-2", "#bbcf26");
      }
      if (page !== selectedPage && layout === "mobile") {
        setIsMobileNavActive(false);
      }
      setSelectedPage(page);
    },
    [selectedPage, layout]
  );

  useEffect(() => {
    if (values[0] <= MOBILE_WIDTH_BREAKPOINT) {
      setLayout("mobile");
    } else {
      setLayout("desktop");
      if (isMobileNavActive) {
        setIsMobileNavActive(false);
      }
    }
  }, [values, isMobileNavActive]);

  useEffect(() => {
    document.title = `Daniel Zambetto - ${selectedPage}`;
  }, [selectedPage]);

  const handleMobileNavToggle = (toggle: boolean) => {
    setIsMobileNavActive(toggle);
  };

  return (
    <div
      className={`${isMobileNavActive ? "page-nav--active " : ""}page`}
      ref={pageRef}
    >
      {layout === "mobile" && isMobileNavActive && (
        <div className="mobile-nav-wrapper">
          <Nav
            pageRef={pageRef}
            routes={navRoutes}
            setSelected={setPageSelection}
          />
          <MobileCornerButton>
            <button
              onClick={() => setIsMobileNavActive(false)}
              onTouchStart={() => setIsMobileNavActive(false)}
              className="pip button"
            >
              Close
            </button>
          </MobileCornerButton>
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
        PageToRender={
          routes.find((item) => item.name === selectedPage)?.component
        }
        layout={layout}
        handleMobileNavToggle={handleMobileNavToggle}
      />
    </div>
  );
}

export default App;
