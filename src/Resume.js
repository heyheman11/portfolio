import "./Resume.css";
import resumeData from "./resume-data.json";

function Heading({ title }) {
  return (
    <div className="heading">
      <h2>{title}</h2>
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
          return (
            <div>
              <Heading title={section.title} />
              <p>{section.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { Resume };
