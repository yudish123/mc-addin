import * as React from "react";
import { mergeClasses, Text } from "@fluentui/react-components";
import { useFunctionStyles } from "../../../hooks/styles/function/useFunctionstyles";
import { useGlobalstyles } from "../../../hooks/styles/useGlobalstyles";
import FunctionsCarousel from "./FunctionsCarousel";
import { Colors } from "../../../utils/constants";
import { useRef } from "react";
import { ChevronDown20Filled } from "@fluentui/react-icons";

const AccordionHeader = ({ item, ind, functions, openIndexes, toggleAccordion, styles, globalStyles }) => {
  const isOpen = openIndexes.includes(item.id);
  const isLast = ind === functions.length - 1;
  const isFirst = ind === 0;
  const isSingle = functions.length === 1;

  const headerStyle = {
    background: "white",
    paddingBottom: "10px",
    borderBottom: isOpen ? "1px solid #F3F3F4" : "none",
    marginTop: "0px",
    ...(!isOpen && isFirst ? { borderTopLeftRadius: "10px", borderTopRightRadius: "10px" } : {}),
    ...(!isOpen && isLast ? { borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" } : {}),
    ...(isSingle
      ? isOpen
        ? { borderBottomLeftRadius: "0px", borderBottomRightRadius: "0px" }
        : {
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
          }
      : {}),
    ...(isOpen && !isLast ? { borderBottomLeftRadius: "0px", borderBottomRightRadius: "0px" } : {}),
  };

  return (
    <div
      onClick={() => toggleAccordion(item.id)}
      className={mergeClasses(
        styles.accordionHeader,
        isFirst && styles.borderStartRadius,
        isLast && !isOpen && styles.borderEndRadius
      )}
      style={headerStyle}
    >
      <Text
        style={{ fontSize: "12px", color: "#475467" }}
        className={mergeClasses(globalStyles.h3, globalStyles.marginTopMedium)}
      >
        {item.name}
      </Text>
      <ChevronDown20Filled
        color="gray"
        className={mergeClasses(
          globalStyles.marginTopMedium,
          isOpen ? styles.accordionArrowOpen : styles.accordionArrow
        )}
      />
    </div>
  );
};

const AccordionBody = ({ item, openIndexes, styles, globalStyles }) => {
  const contentRef = useRef(null);
  const isOpen = openIndexes.includes(item.id);

  return (
    <div
      style={{
        maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
        opacity: isOpen ? 1 : 0,
        transition: "max-height 0.3s ease-in-out, opacity 0.2s ease-in-out",
        overflow: "hidden",
        background: "white",
        paddingInline: "10px",
        paddingBlock: isOpen ? "10px" : "0px",
        borderBottomLeftRadius: isOpen ? "10px" : "0px",
        borderBottomRightRadius: isOpen ? "10px" : "0px",
      }}
      ref={contentRef}
    >
      <div
        style={{
          fontSize: "11px",
          lineHeight: "20px",
          color: "#475467",
          fontWeight: "400",
        }}
        className={mergeClasses(
          globalStyles.h4,
          globalStyles.marginBottomSmall,
          styles.parameterDescription,
          globalStyles.paddingInlineExtraSmall
        )}
      >
        {item.description}
      </div>

      {item.parameters.length > 0 && (
        <>
          <div className={mergeClasses(styles.parameterAccordingHeading, globalStyles.paddingInlineExtraSmall)}>
            <Text
              style={{ fontSize: "12px", color: "#475467" }}
              className={mergeClasses(globalStyles.h3, globalStyles.marginTopZero, globalStyles.marginBottomZero)}
              as="h3"
            >
              Parameters
            </Text>
          </div>

          <div className={styles.parameterContainer}>
            {item.parameters.map((parameter, index) => (
              <div
                key={index}
                style={index !== item.parameters.length - 1 ? { borderBottom: `1px solid ${Colors.border}` } : {}}
                className={mergeClasses(styles.parameterCell)}
              >
                <div>
                  <span style={{ fontSize: "13px", color: "#475467" }} className={globalStyles.h3}>
                    {parameter.name}
                  </span>
                  {parameter.required ? "" : <span> (optional) </span>}:
                  <span className={globalStyles.tag}>&nbsp;&nbsp;&nbsp;{parameter.dataType}&nbsp;&nbsp;&nbsp;</span>
                </div>
                <Text
                  style={{
                    fontSize: "11px",
                    lineHeight: "15px",
                    color: "#475467",
                    fontWeight: "400",
                  }}
                  className={globalStyles.h4}
                >
                  {parameter.description}
                </Text>
                <p
                  style={{
                    fontSize: "11px",
                    lineHeight: "15px",
                    fontWeight: "400",
                    color: "#475467",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                  }}
                  className={mergeClasses(globalStyles.h4, globalStyles.marginTopZero, globalStyles.marginBottomZero)}
                >
                  eg:
                  <span
                    style={{
                      marginLeft: "6px",
                      lineHeight: "1.5",
                      fontWeight: "400",
                    }}
                  >
                    {parameter?.example?.join(", ")}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      <FunctionsCarousel examples={item.examples} />
    </div>
  );
};

const FunctionAccordion = ({ functions, toggleAccordion, openIndexes }) => {
  const styles = useFunctionStyles();
  const globalStyles = useGlobalstyles();

  return (
    <>
      {functions.map((item, ind) => (
        <div key={item.id}>
          <AccordionHeader
            item={item}
            ind={ind}
            functions={functions}
            openIndexes={openIndexes}
            toggleAccordion={toggleAccordion}
            styles={styles}
            globalStyles={globalStyles}
          />
          <AccordionBody item={item} openIndexes={openIndexes} styles={styles} globalStyles={globalStyles} />
        </div>
      ))}
    </>
  );
};

export default FunctionAccordion;
