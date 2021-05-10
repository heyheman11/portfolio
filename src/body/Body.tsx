import "./Body.css";

export function Body({
  PageToRender,
  pageRef,
  layout,
  handleMobileNavToggle,
}: any) {
  return (
    <div className="body">
      <PageToRender pageRef={pageRef} />
      {layout === "mobile" && (
        <button
          className="open-nav pip button"
          onClick={() => handleMobileNavToggle(true)}
        >
          OPEN NAVIGATION
        </button>
      )}
    </div>
  );
}
