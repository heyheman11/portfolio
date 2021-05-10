import "./Resume.css";
import resumeData from "./resume-data.json";
import { Fragment } from "react";

function Heading({ title }: any) {
  return (
    <div className="heading">
      <h2 className="gradient-text">{title}</h2>
      <div className="bottom-border"></div>
    </div>
  );
}

function List({ items }: { items: Array<string> }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

function ExperienceNode({ item }: any) {
  return (
    <div className="experience-node">
      <div className="circle-container">
        <div className="circle"></div>
      </div>
      <div className="workplace">
        <h3>{item.role}</h3>
        <DateStamp title={item.company} date={item.date} />
        {Array.isArray(item.description) ? (
          <List items={item.description} />
        ) : (
          <p>{item.description}</p>
        )}
      </div>
    </div>
  );
}

function ExperienceSection({ section }: any) {
  const renderExperiences = () => {
    if (section?.nodes) {
      return section.nodes.map((item: any, index: number) => {
        return <ExperienceNode key={index} item={item} />;
      });
    }
    if (section?.description) {
      return <p>{section.description}</p>;
    }
  };

  return (
    <div className="section">
      <Heading title={section.title} />
      {renderExperiences()}
    </div>
  );
}

function DateStamp({ title, date }: any) {
  return (
    <p>
      {title} / <span className="date">{date}</span>
    </p>
  );
}

function Education({ section }: any) {
  return (
    <Fragment>
      <Heading title={section.title} />
      <ul>
        {section.nodes.map((item: any, index: number) => {
          return (
            <li key={index}>
              <div className="section" key={index}>
                <DateStamp title={item.place} date={item.date} />
                <p>{item.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
}

function Technologies({ section }: any) {
  return (
    <div className="section">
      <Heading title={section.title} />
      <div className="technologies margin-heading">
        {section.nodes.map((item: any, index: number) => {
          return (
            <div style={{ width: "33%" }} key={index}>
              <h3>{item.type}</h3>
              <List items={item.description} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Resume() {
  return (
    <div style={{ display: "flex" }}>
      <div className="resume">
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
            if (section.type === "education") {
              return <Education key={index} section={section} />;
            }
            if (section.type === "technologies") {
              return <Technologies section={section} />;
            }
            return <ExperienceSection section={section} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

export { Resume };
