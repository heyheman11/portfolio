import { useEffect, useRef } from "react";
import { useDimensions, useMouse } from "../../hooks";
import "./Cube.css";

const ROTATE_CONSTANT = 10;

export function Cube({ pageRef }: any) {
  const [width, height] = useDimensions(pageRef);
  const { x, y } = useMouse(pageRef);
  const areaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const xCoo = (x / (width / 2)) * ROTATE_CONSTANT - ROTATE_CONSTANT;
    const yCoo = (y / (height / 2)) * ROTATE_CONSTANT - ROTATE_CONSTANT;
    if (areaRef && "current" in areaRef) {
      areaRef?.current?.style.setProperty("--rotate-x", `${xCoo}deg`);
      areaRef?.current?.style.setProperty("--rotate-y", `${yCoo * -1}deg`);
    }
  }, [x, y, width, height, areaRef]);

  return (
    <div className="area" ref={areaRef}>
      <div className="cube">
        <div className="cube-face-front cube-face--front">
          <h3>Daniel Zambetto</h3>
        </div>
        <div className="cube-face-front cube-face--back"></div>
        <div className="cube-face-side cube-face--right"></div>
        <div className="cube-face-side cube-face--left"></div>
        <div className="cube-face-front cube-face--top"></div>
        <div className="cube-face-front cube-face--bottom"></div>
      </div>
    </div>
  );
}
