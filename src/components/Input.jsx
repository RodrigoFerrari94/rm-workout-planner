export default function Input({ label, className = "", ...props }) {
  return (
    <div className={`form-field ${className}`}>
      <label className="form-field__label">{label}</label>
      <input className="form-field__input" {...props} />
    </div>
  );
}
