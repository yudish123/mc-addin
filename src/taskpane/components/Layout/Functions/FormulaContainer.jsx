import React from "react";
import { useFormulaStyles } from "../../../hooks/styles/function/useFormulaStyles";
import { functionsData } from "../../../utils/strings/functions";
import { mergeClasses, Text } from "@fluentui/react-components";
import { useGlobalstyles } from "../../../hooks/styles/useGlobalstyles";
import FunctionAccordion from "./FunctionAccordion";
import { Colors } from "../../../utils/constants";

const FormulaContainer = ({ boxTitle, functions }) => {
  const functionsToRender = functionsData.filter((e) => functions.includes(e.name));
  const formulaBoxStyles = useFormulaStyles();
  const globalStyles = useGlobalstyles();

  const [openIndexes, setOpenIndexes] = React.useState([]); // Track open indexes

  const toggleAccordion = (id) => {
    const isItemOpen = openIndexes.includes(id);
    console.log(isItemOpen);
    if (isItemOpen) {
      setOpenIndexes(openIndexes.filter((e) => e !== id));
    } else {
      setOpenIndexes([...openIndexes, id]);
    }
  };

  return (
    <div>
      <Text style={{ color: "#2BB173" }} className={(globalStyles.h2, globalStyles.fontWeight500)}>
        {boxTitle}
      </Text>
      <div className={mergeClasses(formulaBoxStyles.formulaBox, globalStyles.marginTopSmall)}>
        <FunctionAccordion openIndexes={openIndexes} toggleAccordion={toggleAccordion} functions={functionsToRender} />
      </div>
    </div>
  );
};

export default FormulaContainer;
