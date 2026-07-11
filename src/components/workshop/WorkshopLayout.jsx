export default function WorkshopLayout({ children }) {
  return (
    <div className="workshop-root">
      <div className="workshop-shell">{children}</div>
    </div>
  );
}
