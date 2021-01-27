import "./Nav.css";

function Nav({ selected, setSelected, routes }) {
  const getSelected = (page) => {
    if (page === selected) {
      return "currently-selected";
    }
  };

  return (
    <div className="nav">
      <p>
        <button
          className={getSelected("about")}
          onClick={() => setSelected("about")}
        >
          About
        </button>
      </p>
      <p>
        <button
          className={getSelected("projects")}
          onClick={() => setSelected("projects")}
        >
          Projects
        </button>
      </p>
      <p>
        <button
          className={getSelected("resume")}
          onClick={() => setSelected("resume")}
        >
          Resume
        </button>
      </p>
    </div>
  );
}

export { Nav };
