import "./Body.css";

export function Body({ PageToRender, pageRef }: any) {
  return (
    <div className="body">
      <PageToRender pageRef={pageRef} />
    </div>
  );
}
