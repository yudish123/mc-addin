import React from "react";
import { useFormcompStyles } from "../../hooks/styles/useFormcompstyles";
import { Textarea, Label } from "@fluentui/react-components";
import "../../override.css";

const FormTextInput = ({ name, value, labelText, handleChange, placeholder }) => {
  const styles = useFormcompStyles();
  return (
    <div className={styles.formRowContainer}>
      <Label className={styles.label}>{labelText}</Label>
      <Textarea
        placeholder={placeholder}
        autoComplete="off"
        name={name}
        value={value}
        onChange={handleChange}
        className={styles.input}
      />
    </div>
  );
};

export default FormTextInput;
