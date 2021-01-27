import { useState } from "react";
import "./About.css";

export function About() {
  const [direction, setDirection] = useState(null);
  // return (
  //   <div className="about">
  //     <h1>Daniel Zambetto</h1>
  //     <h2>Full stack developer</h2>
  //   </div>
  // );

  return (
    <>
      <div className="area">
        <div className={`cube ${direction || ""}`}>
          <div className="cube-face cube-face--front">Daniel Zambetto</div>
          <div className="cube-face cube-face--back"></div>
          <div className="cube-face cube-face--right"></div>
          <div className="cube-face cube-face--left"></div>
          <div className="cube-face cube-face--top"></div>
          <div className="cube-face cube-face--bottom"></div>
        </div>
      </div>
      <button onClick={() => setDirection("left")}>left</button>
      <button onClick={() => setDirection("right")}>right</button>
    </>
  );
}
