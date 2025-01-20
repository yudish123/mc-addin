import React from "react";

const Uploadicon = ({ color }) => {
  return (
    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.5 5.875H3.25C2.75272 5.875 2.27581 6.07254 1.92417 6.42417C1.57254 6.77581 1.375 7.25272 1.375 7.75V15.25C1.375 15.7473 1.57254 16.2242 1.92417 16.5758C2.27581 16.9275 2.75272 17.125 3.25 17.125H10.75C11.2473 17.125 11.7242 16.9275 12.0758 16.5758C12.4275 16.2242 12.625 15.7473 12.625 15.25V7.75C12.625 7.25272 12.4275 6.77581 12.0758 6.42417C11.7242 6.07254 11.2473 5.875 10.75 5.875H9.5M9.5 3.375L7 0.875M7 0.875L4.5 3.375M7 0.875V11.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Uploadicon;
