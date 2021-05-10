import { Cube } from "./Cube";
import "./About.css";

export function About({ pageRef }: { pageRef: React.Ref<HTMLElement> }) {
  return (
    <div className="about-page">
      <Cube pageRef={pageRef} />
    </div>
  );
}
