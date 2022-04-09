import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        name={name}
        id={name}
        className="form-control mb-2 w-50"
      />
      {error && <div className="alert alert-danger w-50">{error}</div>}
    </div>
  );
};

export default Input;
