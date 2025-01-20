import React from "react";
import {
  Carousel,
  CarouselButton,
  CarouselCard,
  CarouselSlider,
  mergeClasses,
  Text,
  Tooltip,
} from "@fluentui/react-components";
import { useFunctionStyles } from "../../../hooks/styles/function/useFunctionstyles";
import { useGlobalstyles } from "../../../hooks/styles/useGlobalstyles";
import { Colors, Dimensions } from "../../../utils/constants";

const CarouselHeader = ({ activeIndex, examples, styles, globalStyles }) => (
  <div className={styles.carouselHeader}>
    <div className={mergeClasses(styles.carouselHeaderText, globalStyles.paddingInlineExtraSmall)}>
      <Text
        className={mergeClasses(globalStyles.h3, globalStyles.marginTopZero, globalStyles.marginBottomZero)}
        as="h3"
      >
        Examples
      </Text>
    </div>
    <div className={styles.navigationButtons}>
      <Tooltip content="Go To Previous Page" relationship="label">
        <CarouselButton
          className={globalStyles.paddingZero}
          navType="prev"
          aria-label="Previous Carousel Page Button"
        />
      </Tooltip>
      {examples.map((_, index) => (
        <div
          key={index}
          className={mergeClasses(styles.carouselDot, activeIndex === index && styles.activeCarouselDot)}
        ></div>
      ))}
      <Tooltip content="Go To Next Page" relationship="label">
        <CarouselButton className={globalStyles.paddingZero} navType="next" aria-label="Next Carousel Page Button" />
      </Tooltip>
    </div>
  </div>
);

const CarouselContent = ({ examples, styles, globalStyles, insertText }) => (
  <CarouselSlider className={globalStyles.paddingInlineZero}>
    {examples.map((example, index) => (
      <CarouselCard aria-label={`${index + 1} of ${examples.length}`} key={index}>
        <div onClick={() => console.log("Carousel card clicked")} className={styles.carouselCard}>
          <div style={{ paddingInline: Dimensions.spacing.moreLarge, paddingBlock: Dimensions.spacing.medium }}>
            <span>{example}</span>
          </div>
          <div
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              fontWeight: "800",
              alignSelf: "flex-end",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              marginBottom: "10px",
              marginRight: "10px",
              color: Colors.accent,
            }}
            onClick={() => insertText(example)}
          >
            <span style={{ alignSelf: "flex-end" }}>Insert</span>
          </div>
        </div>
      </CarouselCard>
    ))}
  </CarouselSlider>
);

const FunctionsCarousel = ({ examples }) => {
  const styles = useFunctionStyles();
  const globalStyles = useGlobalstyles();
  const [activeIndex, setActiveIndex] = React.useState(0);
  console.log(activeIndex, 90);
  async function insertText(text) {
    try {
      await Excel.run(async (context) => {
        const range = context.workbook.getSelectedRange();
        range.load("formulas");
        range.load("address");
        await context.sync();
        const sanitizedText = text.replace(/[”']/g, '"');
        range.formulas = [[sanitizedText]];
        await context.sync();
      });
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  return (
    <div>
      <Carousel
        activeIndex={activeIndex}
        groupSize={1}
        className={styles.carouselContainer}
        onActiveIndexChange={(e, data) => setActiveIndex(data.index)}
      >
        <div className={styles.carouselBody}>
          <CarouselHeader
            activeIndex={activeIndex}
            examples={examples}
            setActiveIndex={setActiveIndex}
            styles={styles}
            globalStyles={globalStyles}
          />
          <CarouselContent examples={examples} styles={styles} globalStyles={globalStyles} insertText={insertText} />
        </div>
      </Carousel>
    </div>
  );
};

export default FunctionsCarousel;
