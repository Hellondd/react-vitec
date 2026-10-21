function Button({ children, variant = 'primary', size = 'md', type = 'button', ...rest }) {
  return (
    <button type={type} className={`btn btn--${variant} btn--${size}`} {...rest}>
      {children}
    </button>
  );
}

export default Button;
