import { useState, useRef, useEffect } from "react";
import { useWindowDimensions } from "../hooks";
import "./Nav.css";

function Nav({ selected, setSelected, routes, pageRef }) {
  const [initial, setInitial] = useState({ x: 0, y: 0 });
  const [isDragOn, setIsDragOn] = useState(false);
  const [height, width] = useWindowDimensions();
  const containerRef = useRef(null);
  const moveRef = useRef(null);

  const getSelected = (page) => {
    if (page === selected) {
      return "currently-selected";
    }
  };

  const getButtons = () => {
    return routes.map((item, index) => (
      <button
        key={index}
        className={`nav-button ${getSelected(item)}`}
        onClick={() => setSelected(item)}
      >
        {item}
      </button>
    ));
  };

  useEffect(() => {
    const pageCopy = pageRef;
    const onDragStart = (e) => {
      if (moveRef && "current" in moveRef && e.target === moveRef.current) {
        setIsDragOn(true);
        moveRef.current.style.removeProperty("transition");
      }
    };
    const onDrag = (event) => {
      event.preventDefault();
      if (isDragOn) {
        const currentX = event.clientX - initial.x;
        const currentY = event.clientY - initial.y;
        if (moveRef && "current" in moveRef) {
          moveRef.current.style.setProperty("--x-position", `${currentX}px`);
          moveRef.current.style.setProperty("--y-position", `${currentY}px`);
        }
      }
    };
    const onDragEnd = () => {
      setIsDragOn(false);
      if (moveRef && "current" in moveRef) {
        moveRef.current.style.setProperty("--x-position", `${initial.x}px`);
        moveRef.current.style.setProperty("--y-position", `${initial.y}px`);
        moveRef.current.style.setProperty("transition", "all 0.4s");
      }
    };
    if (pageRef && "current" in pageRef) {
      pageRef.current.addEventListener("mousedown", onDragStart, false);
      pageRef.current.addEventListener("mouseup", onDragEnd, false);
      pageRef.current.addEventListener("mousemove", onDrag, false);
    }
    return () => {
      if (pageCopy && "current" in pageCopy) {
        pageCopy.current.removeEventListener("mousedown", onDragStart, false);
        pageCopy.current.removeEventListener("mouseup", onDragEnd, false);
        pageCopy.current.removeEventListener("mousemove", onDrag, false);
      }
    };
  }, [initial, isDragOn, pageRef]);

  useEffect(() => {
    if (moveRef && "current" in moveRef) {
      const { x, y } = moveRef.current.getBoundingClientRect();
      setInitial({ x, y });
    }
    // Need to rerender when window changes as the initial position
    // of element is likely to change
  }, []);

  return (
    <div className="nav" ref={containerRef}>
      <div className="nav-ball" ref={moveRef}></div>
      {isDragOn || true ? (
        <div className="nav-options">
          <div>Home</div>
          <div>Resume</div>
        </div>
      ) : null}
    </div>
  );
}

export { Nav };
