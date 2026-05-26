export default function Select({ label, children, className = "", ...props }) {
  return (
    <div className={`form-field ${className}`}>
      <label className="form-field__label">{label}</label>
      <select className="form-field__input" {...props}>
        {children}
      </select>
    </div>
  );
}
