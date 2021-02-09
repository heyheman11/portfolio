import { useRef, useEffect } from "react";
import "./About.css";
import { useDimensions, useMouse } from "../../hooks";

const ROTATE_CONSTANT = 10;

export function About() {
  const pageRef = useRef(null);
  const [width, height] = useDimensions(pageRef);
  const { x, y } = useMouse(pageRef);

  console.log("x: ", x, "y: ", y);

  useEffect(() => {
    const xCoo = (x / (width / 2)) * ROTATE_CONSTANT - ROTATE_CONSTANT;
    const yCoo =
      (y / (height / 2)) * ROTATE_CONSTANT - ROTATE_CONSTANT;
    if (pageRef && "current" in pageRef) {
      pageRef.current.style.setProperty("--rotate-x", `${xCoo}deg`);
      pageRef.current.style.setProperty("--rotate-y", `${yCoo * -1}deg`);
    }
  }, [x, y, width, height]);

  return (
    <div className="about-page" ref={pageRef}>
      <div className="area">
        <div className={"cube"}>
          <div className="cube-face-front cube-face--front">
            Daniel Zambetto
          </div>
          <div className="cube-face-front cube-face--back"></div>
          <div className="cube-face-side cube-face--right"></div>
          <div className="cube-face-side cube-face--left"></div>
          <div className="cube-face-front cube-face--top"></div>
          <div className="cube-face-front cube-face--bottom"></div>
        </div>
      </div>
    </div>
  );
}
