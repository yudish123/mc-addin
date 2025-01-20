export function getFormula(formula, params) {
  switch (formula) {
    case "GET_COMPANY_DATA":
      return `"=MINDCASE.GET_COMPANY_DATA(${params.company_name},"${params.datapoint}",${params.source},${params.custom_instruction},${params.address})`;
    case "EXTRACT_FROM_WEBPAGE":
      return `"=MINDCASE.EXTRACT_FROM_WEBPAGE("${params.query}","${params.source_url}",${params.output_format},${params.address})`;
    case "ASK":
      return `"=MINDCASE.ASK("${params.query}",${params.input},${params.output_format},${params.enable_web_search},${params.address})`;
    case "STANDARDIZE_UNITS":
      return `"=MINDCASE.STANDARDIZE_UNITS(${params.input},"${params.target_notation}",${params.address})`;
    case "TAG":
      return `"=MINDCASE.TAG(${params.input},${params.tags},${params.address})`;
    case "SUMMARIZE":
      return `"=MINDCASE.SUMMARIZE(${params.input},${params.address})`;
    case "TRANSLATE":
      return `"=MINDCASE.TRANSLATE(${params.input},"${params.target_language}",${params.address})`;
    case "CLASSIFY":
      return `"=MINDCASE.CLASSIFY(${params.input},${params.categories},${params.address})`;
    case "EXTRACT":
      return `"=MINDCASE.EXTRACT(${params.input},${params.instructions},${params.address})`;
    case "WORLD_BANK":
      return `"=MINDCASE.WORLD_BANK("${params.query}",${params.address})`;
    case "LATEST_STARTUP_FUNDING":
      return `"=MINDCASE.LATEST_STARTUP_FUNDING(${params.address})`;
    case "ASK_WEB":
      return `"=MINDCASE.ASK_WEB("${params.query}",${params.input},${params.output_format},${params.address})`;
    case "EXTRACT_WITH_PAGINATION":
      return `"=MINDCASE.EXTRACT_WITH_PAGINATION("${params.query}","${params.source_url}",${params.output_format},${params.no_of_pages},${params.address})`;
    case "YAHOO_FINANCE":
      return `"=MINDCASE.YAHOO_FINANCE("${params.company_name}","${params.datapoint}",${params.output_format},${params.units},${params.address})`;
    case "LINKEDIN_URLs":
      return `"=MINDCASE.LINKEDIN_URLs("${params.query}",${params.address})`;
    case "GET_LINKEDIN_DATA":
      return `"=MINDCASE.GET_LINKEDIN_DATA("${params.URL}","${params.datapoint}",${params.address})`;
    case "ASK_DOC":
      return `"=MINDCASE.ASK_DOC("${params.query}",${params.file_name},${params.output_format},${params.address})`;
    case "ASK_DIR":
      return `"=MINDCASE.ASK_DIR("${params.query}",${params.folder_name},${params.output_format},${params.address})`;
    case "ALL_PDF_TABLES":
      return `"=MINDCASE.ALL_PDF_TABLES("${params.file_name}",${params.address})`;
    case "GET_EMAIL":
      return `"=MINDCASE.GET_EMAIL("${params.linkedin_url}",${params.address})`;
    default:
      break;
  }
}

export function sanitizeInput(input) {
  let sanitizedInput = "";
  if (input) {
    sanitizedInput = input
      .map((innerArray) => innerArray.filter((item) => item.trim() !== "")) // Remove empty strings within each inner array
      .filter((innerArray) => innerArray.length > 0) // Remove empty arrays
      .flat() // Flatten the array into a single array
      .join(" ");
  }
  return sanitizedInput;
}
