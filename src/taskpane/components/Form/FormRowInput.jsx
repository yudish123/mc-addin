import React from "react";
import { useFormcompStyles } from "../../hooks/styles/useFormcompstyles";
import { Input, Label, mergeClasses } from "@fluentui/react-components";

const FormRowInput = ({ className, type, name, value, handleChange, labelText, placeholder, disabled, afterIcon }) => {
  const styles = useFormcompStyles();
  return (
    <div className={mergeClasses(styles.formRowContainer, className)}>
      <Label className={styles.label}>{labelText}</Label>
      <input
        autoComplete="off"
        type={type}
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={mergeClasses(styles.input, disabled ? styles.disabledInput : "")}
      />
      {afterIcon ?? <></>}
    </div>
  );
};

export default FormRowInput;
