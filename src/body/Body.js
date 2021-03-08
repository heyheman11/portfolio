import "./Body.css";

export function Body({ PageToRender, pageRef }) {
  return (
    <div className="body">
      <PageToRender pageRef={pageRef} />
    </div>
  );
}
