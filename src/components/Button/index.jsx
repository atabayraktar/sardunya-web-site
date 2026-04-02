const Button = ({ onClick, variant, label, disabled, ...props }) => {
  return (
    <div className={`btn-${variant}`}>
      <button disabled={disabled} {...props} onClick={onClick}>
        {label}
      </button>
    </div>
  );
};

export default Button;
