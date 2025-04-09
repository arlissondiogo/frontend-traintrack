import "./Button.css";

function Button({ label, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {label}
    </button>
  );
}

export default Button;
