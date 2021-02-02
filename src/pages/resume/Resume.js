import { useRef, useState, useEffect } from "react";
import "./Resume.css";
import resumeData from "./resume-data.json";

const useHeight = (ref) => {
  const [height, setHeight] = useState(0);
  console.log("HEIGHT", height);

  // console.log("HEIGHT ", ref?.current?.offsetWidth);
  useEffect(() => {
    const copiedRef = ref;
    const resize = new ResizeObserver((node) => {
      setHeight(node[0]?.contentRect?.height);
    });
    if (copiedRef && "current" in copiedRef && copiedRef.current !== null) {
      resize.observe(copiedRef.current);
    }
    return () => {
      if (copiedRef && "current" in copiedRef && copiedRef.current !== null) {
        resize.unobserve(copiedRef?.current);
      }
    };
  }, []);
  return height;
};

function Heading({ title }) {
  return (
    <div className="heading">
      <h2>{title}</h2>
    </div>
  );
}

function Section({ section }) {
  return (
    <div>
      <Heading title={section.title} />
      <p>{section.description}</p>
    </div>
  );
}

function ExperienceNode({ item }) {
  return (
    <div className="experience-node">
      <div className="circle-container">
        <div className="circle"></div>
      </div>
      <div className="workplace">
        <h3>{item.role}</h3>
        <p>
          {item.company}
          {" / "}
          <span className="date">{item.date}</span>
        </p>
        <p>{item.description}</p>
      </div>
    </div>
  );
}

function ExperienceSection({ section }) {
  const renderExperiences = () => {
    return section.nodes.map((item, index) => {
      return <ExperienceNode key={index} item={item} />;
    });
  };

  return (
    <div>
      <Heading title={section.title} />
      {renderExperiences()}
    </div>
  );
}

function Resume() {
  return (
    <div className="content">
      <div className="header">
        <h1>{resumeData.heading.name}</h1>
        <div className="header-socials">
          <p>
            <span className="label">Email:</span>{" "}
            {resumeData.heading.contact.email}
          </p>
          <p>
            <span className="label">linkedIn: </span>
            <a href={resumeData.heading.contact.linkedIn}>
              {resumeData.heading.contact.linkedIn}
            </a>
          </p>
          <p>
            <span className="label">Phone:</span>{" "}
            {resumeData.heading.contact.mobile}
          </p>
        </div>
      </div>
      <div className="resume-body">
        {resumeData.body.map((section, index) => {
          if (section?.nodes) {
            return <ExperienceSection section={section} key={index} />;
          }
          return <Section section={section} key={index} />;
        })}
      </div>
    </div>
  );
}

export { Resume };
