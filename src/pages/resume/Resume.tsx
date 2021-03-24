import "./Resume.css";
import resumeData from "./resume-data.json";

function Heading({ title }: any) {
  return (
    <div className="heading">
      <h2>{title}</h2>
    </div>
  );
}

function Section({ section }: any) {
  return (
    <div>
      <Heading title={section.title} />
      <p>{section.description}</p>
    </div>
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

function ExperienceSection({ section }: any) {
  const renderExperiences = () => {
    return section.nodes.map((item: any, index: number) => {
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
