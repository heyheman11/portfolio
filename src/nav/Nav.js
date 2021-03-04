import "./Nav.css";

function Nav({ selected, setSelected, routes }) {
  const getSelected = (page) => {
    if (page === selected) {
      return "currently-selected";
    }
  };

  const getButtons = () => {
    return routes.map((item, index) => (
      <button
        key={index}
        className={`nav-button ${getSelected(item)}`}
        onClick={() => setSelected(item)}
      >
        {item}
      </button>
    ));
  };

  return <div className="nav">{getButtons()}</div>;
}

export { Nav };
