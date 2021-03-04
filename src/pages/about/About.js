import { useRef } from "react";
import { Cube } from "./Cube";
import "./About.css";

/* <div className="orbit earth">
              <div className="inner-orbit">
                <div className="child">🌏</div>
              </div>
            </div>
            <div className="orbit saturn">
              <div className="inner-orbit">
                <div className="child">🪐</div>
              </div>
            </div> */

export function About() {
  const pageRef = useRef(null);

  return (
    <div className="about-page" ref={pageRef}>
      <Cube pageRef={pageRef} />
    </div>
  );
}
