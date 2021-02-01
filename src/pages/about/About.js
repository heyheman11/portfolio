import "./About.css";

export function About() {
  return (
    <div className="about-page">
      <div className="area">
        <div className={"cube"}>
          <div className="cube-face-front cube-face--front">
            Daniel Zambetto Front
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
