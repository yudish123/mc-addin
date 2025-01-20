import React from "react";
import { useFormcompStyles } from "../../hooks/styles/useFormcompstyles";
import { Select, Label, mergeClasses, useId } from "@fluentui/react-components";

const FormSelect = ({ id, className, labelText, options, size, value, handleChange, name }) => {
  const styles = useFormcompStyles();
  const selectId = useId(id);

  return (
    <div className={mergeClasses(styles.formRowContainer, className)}>
      {labelText ? <Label htmlFor={selectId}>{labelText}</Label> : null}
      <Select
        name={name}
        onChange={handleChange}
        size={size ?? "medium"}
        value={value}
        id={selectId}
        className={styles.select}
      >
        {options.map((e) => (
          <option value={e.value}>{e.label}</option>
        ))}
      </Select>
    </div>
  );
};

export default FormSelect;
