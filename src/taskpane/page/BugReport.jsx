import { mergeClasses } from "@fluentui/react-components";
import React, { useEffect } from "react";
import { useGlobalstyles } from "../hooks/styles/useGlobalstyles";
import FormRowInput from "../components/Form/FormRowInput";
import { addOnCellChange, removeOnCellChange } from "../utils/Events/OnCellChange";
import FormTextInput from "../components/Form/FormTextInput";
import { isExcelCellAddress, isExcelCellRange } from "../utils/Helpers";
import { useBugreportStyles } from "../hooks/styles/bug-report/useBugreportstyles";

const BugReport = () => {
  const [formData, setFormData] = React.useState({
    cell: "",
    message: "",
    output: "",
    formula: "",
  });
  const { cell, message, output, formula } = formData;

  const globalStyles = useGlobalstyles();
  const pageStyles = useBugreportStyles();

  const onClick = async () => {
    const formula = JSON.parse(formData.formula)[0][0];
    const formulaStr = JSON.stringify(formula);
    const cleanedFormula = formulaStr.replace(/\\"/g, " ").trim();
    const paramsMatch = cleanedFormula.match(/\(([^)]+)\)/);
    const params = paramsMatch ? paramsMatch[1].split(",").map((param) => param.trim()) : [];

    let updatedFormula = cleanedFormula;

    params.map(async (param, index) => {
      await Excel.run(async (context) => {
        const sheet = context.workbook.worksheets.getActiveWorksheet();
        if (isExcelCellAddress(param)) {
          const range = sheet.getRange(param);
          range.load("values");
          await context.sync();

          // Get the first cell's value (assuming a single value per cell address)
          const cellValue = range.values[0][0];

          // Replace the cell address with its actual value in the formula string
          updatedFormula = updatedFormula.replace(param, cellValue);
        } else if (isExcelCellRange(param)) {
          const range = sheet.getRange(param);
          range.load("values");
          await context.sync();
          updatedFormula = updatedFormula.replace(param, JSON.stringify(range.values));
        }
      });
      if (index === params.length - 1) {
        const gmailUrl =
          "https://mail.google.com/mail/?view=cm&fs=1&to=team@mindcase.co" +
          `&su=Bug%20Report&body=%0D%0A== Bug Report ==%0D%0A%0D%0A` +
          `* 📝 Formula:%0D%0A   ${encodeURIComponent(updatedFormula)}%0D%0A%0D%0A` +
          `* 📊 Output:%0D%0A   ${encodeURIComponent(formData.output)}%0D%0A%0D%0A` +
          `* 💬 Message:%0D%0A   ${encodeURIComponent(formData.message)}%0D%0A%0D%0A` +
          `------------------------------%0D%0A` +
          `Report generated automatically by Mindcase`;

        window.open(gmailUrl, "_blank");
      }
    });
  };

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const setData = async () => {
      await Excel.run(async (context) => {
        const sheet = context.workbook.worksheets.getActiveWorksheet();
        const range = sheet.getRange(cell);
        range.load("formulas");
        await context.sync();
        range.load("values");
        await context.sync();
        const formulaStr = JSON.stringify(range.formulas);
        if (formulaStr.length <= 6 || !formulaStr.includes("=")) {
          return;
        }
        setFormData({ ...formData, output: range.values, formula: formulaStr });
      });
    };
    if (!cell) {
      setFormData({ ...formData, formula: "", output: "" });
      return;
    }
    setData();
  }, [cell]);

  useEffect(() => {
    let event;
    addOnCellChange(event, (ev) => {
      setFormData({ ...formData, cell: ev.address });
    });
    return () => {
      removeOnCellChange(event);
    };
  }, []);

  //   useEffect(() => {
  //     let event;
  //     addOnCellChange(event, (ev) => console.log(ev));
  //     return () => {
  //       removeOnCellChange(event);
  //     };
  //   }, []);

  return (
    <div className={globalStyles.container}>
      <h3
        className={mergeClasses(
          globalStyles.h3,
          globalStyles.marginBottomExtraSmall,
          globalStyles.marginTopZero,
          pageStyles.headerText
        )}
      >
        Fill this form to report a bug
      </h3>
      <FormRowInput
        className={globalStyles.marginTopMedium}
        name={"cell"}
        labelText={"Cell Reference"}
        placeholder="Enter cell address"
        value={cell}
        handleChange={handleChange}
      />
      <FormRowInput
        name={"formula"}
        placeholder="Enter Formula"
        labelText={"Formula"}
        value={formula}
        disabled={true}
        handleChange={handleChange}
      />
      <FormRowInput
        name={"output"}
        placeholder="Enter Output"
        labelText={"Output"}
        value={output}
        disabled={true}
        handleChange={handleChange}
      />
      <FormTextInput
        name={"message"}
        placeholder="Enter Message"
        labelText={"Message"}
        value={message}
        handleChange={handleChange}
      />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <button
          style={{ width: "40%" }}
          className={mergeClasses(globalStyles.accentBtn, globalStyles.marginTopMedium)}
          onClick={onClick}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default BugReport;
