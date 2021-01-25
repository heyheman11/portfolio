import "./Resume.css";
import resumeData from "./resume-data.json";

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

function ExperienceSection({ section }) {
  const renderExperiences = () => {
    return section.nodes.map((item, key) => {
      return (
        <div className="experience-node">
          <div className="circle"></div>
          <div>
            <p>{item.first}</p>
            <p>{item.subtitle}</p>
            <p>{item.description}</p>
          </div>
        </div>
      );
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
  console.log(resumeData);
  return (
    <div className="content">
      <div className="header">
        <h1>{resumeData.heading.name}</h1>
        <div className="header-socials">
          <span>{`Email: ${resumeData.heading.contact.email}`}</span>
          <span>
            linkedIn:
            <a href={resumeData.heading.contact.linkedIn}>
              {resumeData.heading.contact.linkedIn}
            </a>
          </span>
          <span>{`Phone: ${resumeData.heading.contact.mobile}`}</span>
        </div>
      </div>
      <div className="body">
        {resumeData.body.map((section, index) => {
          console.log(section);
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
