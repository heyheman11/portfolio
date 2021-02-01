import "./Nav.css";

function Nav({ selected, setSelected, routes }) {
  const getSelected = (page) => {
    if (page === selected) {
      return "currently-selected";
    }
  };

  const getButtons = () => {
    return routes.map((item, index) => (
      <div key={index} className="nav-button--outer">
        <button className={getSelected(item)} onClick={() => setSelected(item)}>
          {item}
        </button>
      </div>
    ));
  };

  return <div className="nav">{getButtons()}</div>;
}

export { Nav };
