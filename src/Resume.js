import "./Resume.css";

function Heading({ title }) {
  return (
    <div class="heading">
      <h2>{title}</h2>
    </div>
  );
}

function Resume() {
  return (
    <div class="content">
      <div class="header">
        <h1>Daniel Zambetto</h1>
        <div class="header-socials">
          <span>Email: daniel.zambetto@gmail.com</span>
          <span>
            linkedIn:
            <a href="https://www.linkedin.com/in/daniel-zambetto-90285ab5/">
              https://www.linkedin.com/in/daniel-zambetto-90285ab5/
            </a>
          </span>
          <span>Phone: +61 437 908 774</span>
        </div>
      </div>
      <div class="body">
        <div class="column">
          <div>
          <Heading title="ABOUT ME"/>
            <p>
              Hi there, I'm a software developer located in Melbourn, Australia!
            </p>
          </div>
          <Heading title="EXPERIENCE"/>
        </div>
        <div class="column">
          <Heading title="EDUCATION"/>
          <Heading title="HIGHTLIGHTS"/>
        </div>
      </div>
    </div>
  );
}

export { Resume };
