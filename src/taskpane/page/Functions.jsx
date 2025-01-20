import React from "react";
import { useGlobalstyles } from "../hooks/styles/useGlobalstyles";
import { functionTypes } from "../utils/strings/functions";
import FormulaContainer from "../components/Layout/Functions/FormulaContainer";
import { mergeClasses } from "@fluentui/react-components";
import { useFormulaStyles } from "../hooks/styles/function/useFormulaStyles";

const Functions = () => {
  const globalStyles = useGlobalstyles();
  const formulaStyles = useFormulaStyles();

  return (
    <div className={mergeClasses(globalStyles.container, formulaStyles.formulaBoxCotnainer)}>
      {functionTypes.map((e) => (
        <FormulaContainer imgUrl={e.imgUrl} boxTitle={e.name} functions={e.functions} />
      ))}
    </div>
  );
};

export default Functions;
