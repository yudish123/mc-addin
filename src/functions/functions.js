import { getFormula } from "./utils/formula";

/* global console */
const { processOutputFormat, logMessageWithCellAddress } = require("./utils");
const { isCacheEnabled, getCacheData, setCacheData } = require("./utils/caching");
const {
  fetchApi,
  askApi,
  extractApi,
  tag_api,
  summarize_api,
  translate_api,
  categ_api,
  find_api,
  standardizeUnitsApi,
  worldBankApi,
  yahooFinanceApi,
  customStartupFundingApi,
  linkedinurls_api,
  linkedinGetDataApi,
  askDocumentApi,
  askFolderApi,
  allPdfTablesApi,
  getEmailApi,
} = require("./apis");

/**
 * Writes a message to console.log().
 * @customfunction TEST
 * @param {string} message String to write.
 * @returns {string[][]} A dynamic array with multiple results.
 * @helpurl https://aback-chameleon-c1f.notion.site/Mindcase-Home-161d0616625f808e9239c0a402361336?pvs=4
 */
export function testfunction() {
  const data = {
    series: ["Year", "Revenue"],
    Year: ["2024", "2023", "2022", "2021"],
    Revenue: ["$385.603B", "$383.285B", "$394.328B", "$365.817B"],
    sources: [
      "Apple Revenue 2010-2024 | AAPL | MacroTrends - https://www.macrotrends.net/stocks/charts/AAPL/apple/revenue",
    ],
  };
  const headers = data["series"];
  const rows = headers.map((header) => data[header]);
  const resultArray = [headers, ...rows[0].map((_, i) => rows.map((row) => row[i]))];
  console.log(resultArray);
  return resultArray;
}

/**
 * Retrieves company data based on specified details and instructions
 * @customfunction GET_COMPANY_DATA
 * @param {string} company_name Name of the company
 * @param {string} datapoint Specific information to retrieve
 * @param {string} [source] Source URL or database
 * @param {string[][]} [custom_instruction] Additional guidance for data retrieval
 * @helpurl https://aback-chameleon-c1f.notion.site/Mindcase-Home-161d0616625f808e9239c0a402361336?pvs=4
 * @param {CustomFunctions.Invocation} invocation Invocation object.
 * @returns {string[][]} return dynamic arrays
 * @requiresAddress
 */
export async function fetchMindcase(company_name, datapoint, source, custom_instruction, invocation) {
  try {
    const address = invocation.address;
    const key = getFormula("GET_COMPANY_DATA", { company_name, datapoint, source, custom_instruction, address });
    const cacheEnabled = await isCacheEnabled();
    const cacheData = await getCacheData(key);
    if (cacheEnabled && cacheData) {
      return [[cacheData.value]];
    }
    // eslint-disable-next-line no-undef
    const response = await fetchApi(company_name, datapoint, source, custom_instruction);

    if (!response.success) {
      console.log(response, "error resp");
      return [[response.error.split(":")[1]]];
    }

    const data = response.data;
    const nocache = data.no_cache ?? false;
    // eslint-disable-next-line no-undef
    if (data.sources && data.sources.length > 0) await logMessageWithCellAddress(data.sources, address);
    if (cacheEnabled && !nocache) setCacheData(key, data);
    return [[data.value]] ?? [["No data received"]];
  } catch (error) {
    console.log(error);
    return [[JSON.stringify(error)]];
  }
}

/**
 * Extracts financial data from Yahoo Finance
 * @customfunction YAHOO_FINANCE
 * @param {string} company_name Name of the company eg:"Microsoft", A2
 * @param {string} datapoint Specific data point to retrieve (e.g., revenue, balance sheet)
 * @param {number} [output_format] 0: Single Cell, 1: Vertical List, 2: Horizontal List, 3: Table
 * @param {string} [units] Desired unit or notation for standardization
 * @helpurl https://aback-chameleon-c1f.notion.site/Mindcase-Home-161d0616625f808e9239c0a402361336?pvs=4
 * @param {CustomFunctions.Invocation} invocation Invocation object.
 * @returns {string[][]} return dynamic arrays
 * @requiresAddress
 */
export async function yahooFinance(company_name, datapoint, output_format, units, invocation) {
  try {
    const address = invocation.address;
    const key = getFormula("YAHOO_FINANCE", { company_name, datapoint, output_format, units, address });
    const cacheEnabled = await isCacheEnabled();
    const cacheData = await getCacheData(key);
    if (cacheEnabled && cacheData) {
      return cacheData;
    }
    // eslint-disable-next-line no-undef
    const response = await yahooFinanceApi(company_name, datapoint, output_format, units);
    console.log(response);
    if (!response.success) {
      return [[response.error.message]];
    }
    const data = response.data;
    const nocache = data.no_cache ?? false;
    const res = processOutputFormat(data, output_format);
    if (cacheEnabled && !nocache) setCacheData(key, res);
    return res;
  } catch (error) {
    console.error(error);
    return `Error: Something went wrong`;
  }
}

/**
 * Handles queries using LLMs, without web search capability
 * @customfunction ASK
 * @param {string[][]} query Input query in natural language
 * @param {string[][]} [input] Excel data range for reference
 * @param {number} [output_format] Output style (0: cell, 1: cols, 2: rows, 3: table)
 * @helpurl https://aback-chameleon-c1f.notion.site/Mindcase-Home-161d0616625f808e9239c0a402361336?pvs=4
 * @param {CustomFunctions.Invocation} invocation Invocation object.
 * @requiresAddress
 * @returns {string[][]} A dynamic array with multiple results.
 */
export async function askMindcase(query, input, output_format, invocation) {
  try {
    const address = invocation.address;
    const key = getFormula("ASK", { query, input, output_format, address });
    const cacheEnabled = await isCacheEnabled();
    const cacheData = await getCacheData(key);
    if (cacheEnabled && cacheData) {
      return cacheData;
    }
    // eslint-disable-next-line no-undef
    const response = await askApi(query, input, output_format, 0);
    console.log(response);
    if (!response.success) {
      return [[response.error.message]];
    }
    const data = response.data;
    const nocache = data.no_cache ?? false;
    // eslint-disable-next-line no-undef
    const res = processOutputFormat(data, output_format);
    if (cacheEnabled && !nocache) setCacheData(key, res);
    return res;
  } catch (error) {
    console.error(error);
    return `Error: Something went wrong`;
  }
}

/**
 * Handles queries using LLMs, with web search capability
 * @customfunction ASK_WEB
 * @param {string[][]} query Input query in natural language
 * @param {string[][]} [input] Excel data range for reference
 * @param {number} [output_format] Output style (0: cell, 1: cols, 2: rows, 3: table)
 * @helpurl https://aback-chameleon-c1f.notion.site/Mindcase-Home-161d0616625f808e9239c0a402361336?pvs=4
 * @param {CustomFunctions.Invocation} invocation Invocation object.
 * @requiresAddress
 * @returns {string[][]} A dynamic array with multiple results.
 */
export async function askMindcaseWeb(query, input, output_format, invocation) {
  try {
    const address = invocation.address;
    const key = getFormula("ASK_WEB", { query, input, output_format, address });
    const cacheEnabled = await isCacheEnabled();
    const cacheData = await getCacheData(key);
    if (cacheEnabled && cacheData) {
      return cacheData;
    }
    // eslint-disable-next-line no-undef
    const response = await askApi(query, input, output_format, 1);
    console.log(response);
    if (!response.success) {
      return [[response.error.message]];
    }
    const data = response.data;
    const nocache = data.no_cache ?? false;
    if (data.sources && data.sources.length > 0) await logMessageWithCellAddress(data.sources, address);
    const res = processOutputFormat(data, output_format);
    if (cacheEnabled && !nocache) setCacheData(key, res);
    return res;
  } catch (error) {
    console.error(error);
    return `Error: Something went wrong`;
  }
}

/**
 * Function to extract relevant info from web pages
 * @customfunction EXTRACT_FROM_WEBPAGE
 * @param {string[][]} query Input query in natural language
 * @param {string} source_url Source URL for extraction
 * @param {number} [output_format] Output style (0: cell, 1: cols, 2: rows, 3: table)
 * @helpurl https://aback-chameleon-c1f.notion.site/Mindcase-Home-161d0616625f808e9239c0a402361336?pvs=4
 * @param {CustomFunctions.Invocation} invocation Invocation object.
 * @returns {string[][]} return dynamic arrays
 * @requiresAddress
 */
export async function extractMindcase(query, source_url, output_format, invocation) {
  try {
    const address = invocation.address;
    const key = getFormula("EXTRACT_FROM_WEBPAGE", {
      query,
      source_url,
      output_format,
      address,
    });
    const cacheEnabled = await isCacheEnabled();
    const cacheData = await getCacheData(key);
    if (cacheEnabled && cacheData) {
      return cacheData;
    }
    // eslint-disable-next-line no-undef
    const response = await extractApi(query, source_url, output_format, 0);
    console.log(response);
    if (!response.success) {
      return [[response.error.message]];
    }
    const data = response.data;
    const nocache = data.no_cache ?? false;
    // eslint-disable-next-line no-undef
    if (data.sources && data.sources.length > 0) await logMessageWithCellAddress(data.sources, address);
    const res = processOutputFormat(data, output_format);
    if (cacheEnabled && !nocache) setCacheData(key, res);
    return res;
  } catch (error) {
    console.error(error);
    return `Error: Something went wrong`;
  }
}

/**
 * Extracts relevant Linkedin URLs based on user query
 * @customfunction LINKEDIN_URLs
 * @param {string} query Keywords to find relevant people
 * @helpurl https://aback-chameleon-c1f.notion.site/Mindcase-Home-161d0616625f808e9239c0a402361336?pvs=4
 * @param {CustomFunctions.Invocation} invocation Invocation object.
 * @returns {string[][]} return dynamic arrays
 * @requiresAddress
 */
export async function linkedinUrls(query, invocation) {
  try {
    const address = invocation.address;
    const key = getFormula("LINKEDIN_URLs", { query, address });
    const cacheEnabled = await isCacheEnabled();
    const cacheData = await getCacheData(key);
    if (cacheEnabled && cacheData) {
      return cacheData;
    }
    // eslint-disable-next-line no-undef
    const response = await linkedinurls_api(query);
    console.log(response);
    if (!response.success) {
      return [[response.error.message]];
    }
    const data = response.data;
    const nocache = data.no_cache ?? false;
    // eslint-disable-next-line no-undef
    if (data.sources && data.sources.length > 0) await logMessageWithCellAddress(data.sources, address);
    const res = processOutputFormat(data, 2);
    if (cacheEnabled && !nocache) setCacheData(key, res);
    return res;
  } catch (error) {
    console.error(error);
    return `Error: Something went wrong`;
  }
}

/**
 * Extracts relevant details from a Linkedin URL
 * @customfunction GET_LINKEDIN_DATA
 * @param {string} URL Provide the Linkedin URL of relevant person
 * @param {string} datapoint Specific information to retrieve
 * @helpurl https://aback-chameleon-c1f.notion.site/Mindcase-Home-161d0616625f808e9239c0a402361336?pvs=4
 * @param {CustomFunctions.Invocation} invocation Invocation object.
 * @returns {string} return dynamic arrays
 * @requiresAddress
 */
export async function linkedinData(URL, datapoint, invocation) {
  try {
    const address = invocation.address;
    const key = getFormula("GET_LINKEDIN_DATA", { URL, datapoint, address });
    const cacheEnabled = await isCacheEnabled();
    const cacheData = await getCacheData(key);
    if (cacheEnabled && cacheData) {
      return cacheData;
    }
    // eslint-disable-next-line no-undef
    const response = await linkedinGetDataApi(URL, datapoint);
    console.log(response);
    if (!response.success) {
      return response.error.message;
    }
    const data = response.data;
    const value = data.value;
    const nocache = data.no_cache ?? false;
    // eslint-disable-next-line no-undef
    if (data.sources && data.sources.length > 0) await logMessageWithCellAddress(data.sources, address);
    if (cacheEnabled && !nocache) setCacheData(key, value);
    return value;
  } catch (error) {
    console.error(error);
    return `Error: Something went wrong`;
  }
}

/**
 * Function to extract relevant info from web pages
 * @customfunction EXTRACT_WITH_PAGINATION
 * @param {string[][]} query Input query in natural language
 * @helpurl https://aback-chameleon-c1f.notion.site/Mindcase-Home-161d0616625f808e9239c0a402361336?pvs=4
 * @param {string} source_url Source URL for extraction
 * @param {number} [output_format] Output style (0: cell, 1: cols, 2: rows, 3: table)
 * @param {number} [no_of_pages] Number of pages to extract data from
 * @param {CustomFunctions.Invocation} invocation Invocation object.
 * @returns {string[][]} return dynamic arrays
 * @requiresAddress
 */
export async function extractWithPagination(query, source_url, output_format, no_of_pages, invocation) {
  try {
    const address = invocation.address;
    const key = getFormula("EXTRACT_WITH_PAGINATION", {
      query,
      source_url,
      output_format,
      no_of_pages,
      address,
    });
    const cacheEnabled = await isCacheEnabled();
    const cacheData = await getCacheData(key);
    if (cacheEnabled && cacheData) {
      return cacheData;
    }
    // eslint-disable-next-line no-undef
    const response = await extractApi(query, source_url, output_format, 1, no_of_pages);
    console.log(response);
    if (!response.success) {
      return [[response.error.message]];
    }
    const data = response.data;
    const nocache = data.no_cache ?? false;
    // eslint-disable-next-line no-undef
    if (data.sources && data.sources.length > 0) await logMessageWithCellAddress(data.sources, address);
    const res = processOutputFormat(data, output_format);
    if (cacheEnabled && !nocache) setCacheData(key, res);
    return res;
  } catch (error) {
    console.error(error);
    return `Error: Something went wrong`;
  }
}

/**
 * Sends a prompt to the Mindcase API and returns the response.
 * @customfunction STANDARDIZE_UNITS
 * @helpurl https://aback-chameleon-c1f.notion.site/Mindcase-Home-161d0616625f808e9239c0a402361336?pvs=4
 * @param {string} input intput value for conversion.
 * @param {string} target_notation unit in which value should be converted.
 * @param {CustomFunctions.Invocation} invocation Invocation object.
 * @returns {string} converted value
 * @requiresAddress
 */
export async function standardizedUnit(input, target_notation, invocation) {
  try {
    const address = invocation.address;
    const key = getFormula("STANDARDIZE_UNITS", { input, target_notation, address });
    const cacheEnabled = await isCacheEnabled();
    const cacheData = await getCacheData(key);
    if (cacheEnabled && cacheData) {
      return cacheData;
    }
    // eslint-disable-next-line no-undef
    const response = await standardizeUnitsApi(input, target_notation);
    console.log(response);
    if (!response.success) {
      return response.error.message;
    }
    const data = response.data;
    const value = data.value;
    const nocache = data.no_cache ?? false;
    if (cacheEnabled && !nocache) setCacheData(key, value);
    return value;
  } catch (error) {
    console.log(error);
    return `Error: Something went wrong`;
  }
}

/**
 * Retrieves specific data based on given instructions
 * @customfunction EXTRACT
 * @helpurl https://aback-chameleon-c1f.notion.site/Mindcase-Home-161d0616625f808e9239c0a402361336?pvs=4
 * @param {string[][]} input Excel data range to process eg. “AGR solutions is your technical partner.“
 * @param {string[][]} instructions Criteria or rules for extraction written in free-form text
  eg. “Company name”
 * @param {CustomFunctions.Invocation} invocation Invocation object.
 * @returns {string} converted value
 * @requiresAddress
 */
export async function findApi(input, instructions, invocation) {
  try {
    const address = invocation.address;
    const key = getFormula("EXTRACT", { input, instructions, address });
    const cacheEnabled = await isCacheEnabled();
    const cacheData = await getCacheData(key);
    if (cacheEnabled && cacheData) {
      return cacheData;
    }
    // eslint-disable-next-line no-undef
    const response = await find_api(input, instructions);
    console.log(response);
    if (!response.success) {
      return response.error.message;
    }
    const data = response.data;
    const nocache = data.no_cache ?? false;
    // eslint-disable-next-line no-undef
    if (cacheEnabled && !nocache) setCacheData(key, data.value);
    return data.value;
  } catch (error) {
    console.log(error);
    return `Error: Something went wrong`;
  }
}

/**
 * Retrieves specific data based on given instructions
 * @customfunction WORLD_BANK
 * @helpurl https://aback-chameleon-c1f.notion.site/Mindcase-Home-161d0616625f808e9239c0a402361336?pvs=4
 * @param {string} query Input query in natural language
 * @param {CustomFunctions.Invocation} invocation Invocation object.
 * @requiresAddress
 * @returns {string[][]} converted value
 */
export async function worldBank(query, invocation) {
  try {
    const address = invocation.address;
    const key = getFormula("WORLD_BANK", { query, address });
    const cacheEnabled = await isCacheEnabled();
    const cacheData = await getCacheData(key);
    if (cacheEnabled && cacheData) {
      return cacheData;
    }
    // eslint-disable-next-line no-undef
    const response = await worldBankApi(query);
    console.log(response);
    if (!response.success) {
      return [[response.error.message]];
    }
    const data = response.data;
    const nocache = data.no_cache ?? false;
    // eslint-disable-next-line no-undef
    if (data.sources && data.sources.length > 0) await logMessageWithCellAddress(data.sources, address);
    const res = processOutputFormat(data, 3);
    console.log(res)
    if (cacheEnabled && !nocache) setCacheData(key, res);
    return res;
  } catch (error) {
    console.log(error);
    return `Error: Something went wrong`;
  }
}

/**
 * Retrieves specific data based on given instructions
 * @customfunction LATEST_STARTUP_FUNDING
 * @helpurl https://aback-chameleon-c1f.notion.site/Mindcase-Home-161d0616625f808e9239c0a402361336?pvs=4
 * @param {CustomFunctions.Invocation} invocation Invocation object.
 * @requiresAddress
 * @returns {string} converted value
 */
export async function startupFunding(invocation) {
  try {
    const address = invocation.address;
    const key = getFormula("LATEST_STARTUP_FUNDING", {}, address);
    const cacheEnabled = await isCacheEnabled();
    const cacheData = await getCacheData(key);
    console.log(key, cacheData);
    if (cacheEnabled && cacheData) {
      return cacheData;
    }
    // eslint-disable-next-line no-undef
    const response = await customStartupFundingApi();
    console.log(response);
    if (!response.success) {
      return response.error.message;
    }
    const data = response.data;
    const value = data.value;
    const nocache = data.no_cache ?? false;
    // eslint-disable-next-line no-undef
    if (data.sources && data.sources.length > 0) await logMessageWithCellAddress(data.sources, address);
    if (cacheEnabled && !nocache) setCacheData(key, value);
    return value;
  } catch (error) {
    console.log(error);
    return `Error: Something went wrong`;
  }
}

/**
 * Assigns input values to specified categories
 * @customfunction CLASSIFY
 * @helpurl https://aback-chameleon-c1f.notion.site/Mindcase-Home-161d0616625f808e9239c0a402361336?pvs=4
 * @param {string[][]} input Value(s) to be classified eg: “OpenAI”
 * @param {string[][]} categories Defined groups or classes for classification
 * @param {CustomFunctions.Invocation} invocation Invocation object.
 * @requiresAddress
 * @returns {string} converted value
 */
export async function categorise(input, categories, invocation) {
  try {
    const address = invocation.address;
    const key = getFormula("CLASSIFY", { input, categories, address });
    const cacheEnabled = await isCacheEnabled();
    const cacheData = await getCacheData(key);
    console.log(cacheData, key);
    if (cacheEnabled && cacheData) {
      return cacheData;
    }
    // eslint-disable-next-line no-undef
    const response = await categ_api(input, categories);
    console.log(response);
    if (!response.success) {
      return response.error.message;
    }
    const data = response.data;
    const value = data.value;
    const nocache = data.no_cache;
    if (cacheEnabled && !nocache) setCacheData(key, value);
    return value;
  } catch (error) {
    console.log(error);
    return `Error: Something went wrong`;
  }
}

/**
 * Assigns tags to input values
 * @customfunction TAG
 * @helpurl https://aback-chameleon-c1f.notion.site/Mindcase-Home-161d0616625f808e9239c0a402361336?pvs=4
 * @param {string[][]} input Value(s) to be tagged eg. ”I loved the product, disappointed with delivery delays”
 * @param {string[][]} tags Labels or identifiers to assign
 * @param {CustomFunctions.Invocation} invocation Invocation object.
 * @requiresAddress
 * @returns {string} converted value
 */
export async function tags(input, tags, invocation) {
  try {
    const address = invocation.address;
    const key = getFormula("TAG", { input, tags, address });
    const cacheEnabled = await isCacheEnabled();
    const cacheData = await getCacheData(key);
    if (cacheEnabled && cacheData) {
      return cacheData;
    }
    // eslint-disable-next-line no-undef
    const response = await tag_api(input, tags);
    console.log(response);
    if (!response.success) {
      return response.error.message;
    }
    const data = response.data;
    const nocache = data.no_cache;
    // eslint-disable-next-line no-undef
    if (cacheEnabled && !nocache) setCacheData(key, data.value);
    return data.value;
  } catch (error) {
    console.log(error);
    return `Error: Something went wrong`;
  }
}

/**
 * Generates a concise summary of the input
 * @customfunction SUMMARIZE
 * @helpurl https://aback-chameleon-c1f.notion.site/Mindcase-Home-161d0616625f808e9239c0a402361336?pvs=4
 * @param {string[][]} input Excel data range to summarize
eg. A1, A1:A10, A1:H7
 * @param {CustomFunctions.Invocation} invocation
 * @requiresAddress
 * @returns {string} Returns a concise summary of the input data.
 */
export async function summarize(input, invocation) {
  try {
    const address = invocation.address;
    const key = getFormula("SUMMARIZE", { input, address });
    const cacheEnabled = await isCacheEnabled();
    const cacheData = await getCacheData(key);
    if (cacheEnabled && cacheData) {
      return cacheData;
    }
    // eslint-disable-next-line no-undef
    const response = await summarize_api(input);
    console.log(response);
    if (!response.success) {
      return response.error.message;
    }
    const data = response.data;
    const nocache = data.no_cache;
    if (cacheEnabled && !nocache) setCacheData(key, data.value);
    return data.value;
  } catch (error) {
    console.log(error);
    return `Error: Something went wrong`;
  }
}

/**
 * Translates input into the target language
 * @customfunction TRANSLATE
 * @helpurl https://aback-chameleon-c1f.notion.site/Mindcase-Home-161d0616625f808e9239c0a402361336?pvs=4
 * @param {string[][]} input Excel data range to translate eg. ”хелло”
 * @param {string} target_language Language for the translation eg. “English”
 * @param {CustomFunctions.Invocation} invocation
 * @requiresAddress
 * @returns {string} Returns the translated data in the specified language.
 */
export async function translate(input, target_language, invocation) {
  try {
    const address = invocation.address;
    const key = getFormula("TRANSLATE", { input, target_language, address });
    const cacheEnabled = await isCacheEnabled();
    const cacheData = await getCacheData(key);
    if (cacheEnabled && cacheData) {
      return cacheData;
    }
    // eslint-disable-next-line no-undef
    const response = await translate_api(input, target_language);
    console.log(response);
    if (!response.success) {
      return response.error.message;
    }
    const data = response.data;
    const nocache = data.no_cache;
    console.log(response);
    if (cacheEnabled && !nocache) setCacheData(key, data.value);
    return data.value;
  } catch (error) {
    console.log(error);
    return `Error: Something went wrong`;
  }
}

/**
 * Retrieves the comment (note) from a specified cell.
 * @customfunction GET_COMMENT
 * @helpurl https://aback-chameleon-c1f.notion.site/Mindcase-Home-161d0616625f808e9239c0a402361336?pvs=4
 * @param {string} address The address of the cell to retrieve the comment from, in the format "A1".
 * @param {CustomFunctions.Invocation} invocation Invocation object.
 * @returns {string} Returns the comment text from the specified cell.
 * @requiresParameterAddresses
 */
export async function getComment(address, invocation) {
  try {
    console.log(invocation.parameterAddresses, invocation);
    const cell_add = invocation.parameterAddresses[0];
    console.log(cell_add);
    const context = new Excel.RequestContext();
    const sheet = context.workbook.worksheets.getActiveWorksheet();
    const comments = sheet.comments.getItemByCell(cell_add);
    comments.load("content");
    await context.sync();
    console.log("4");
    return comments.content;
  } catch (error) {
    console.log(error);
  }
  return "Hello";
}

/**
 * Retrieves the comment (note) from a specified cell.
 * @customfunction ASK_DOC
 * @helpurl https://aback-chameleon-c1f.notion.site/Mindcase-Home-161d0616625f808e9239c0a402361336?pvs=4
 * @param {string} query The address of the cell to retrieve the comment from, in the format "A1".
 * @param {string} file_name
 * @param {number} [output_format] Output style (0: cell, 1: cols, 2: rows, 3: table)
 * @param {CustomFunctions.Invocation} invocation Invocation object.
 * @returns {string[][]} return dynamic arrays
 * @requiresAddress
 */
export async function askDocument(query, file_name, output_format, invocation) {
  try {
    const address = invocation.address;
    const enabled = await isCacheEnabled();
    const key = getFormula("ASK_DOC", { query, file_name, output_format, address });
    const cacheData = await getCacheData(key);
    if (enabled && cacheData) {
      return cacheData;
    }
    const res = await askDocumentApi(query, file_name, output_format);

    if (!res.success) {
      return [[res.error.message]];
    }
    const resp = await res.data;
    const nocache = resp.no_cache ?? false;
    if (resp.sources && resp.sources.length > 0) await logMessageWithCellAddress(resp.sources, invocation.address);
    const output = processOutputFormat(resp, output_format);
    if (enabled && !nocache) setCacheData(key, output);
    return output;
  } catch (error) {
    console.log(error);
    return [[error]];
  }
}

/**
 * Retrieves the comment (note) from a specified cell.
 * @customfunction ASK_DIR
 * @helpurl https://aback-chameleon-c1f.notion.site/Mindcase-Home-161d0616625f808e9239c0a402361336?pvs=4
 * @param {string} query Directory question
 * @param {string} folder_name
 * @param {number} [output_format] Output style (0: cell, 1: cols, 2: rows, 3: table)
 * @param {CustomFunctions.Invocation} invocation Invocation object.
 * @returns {string[][]} return dynamic arrays
 * @requiresAddress
 */
export async function askFolder(query, folder_name, output_format, invocation) {
  try {
    const address = invocation.address;
    const enabled = await isCacheEnabled();
    const key = getFormula("ASK_DIR", { query, folder_name, output_format, address });
    const cacheData = await getCacheData(key);
    if (enabled && cacheData) {
      return cacheData;
    }
    const res = await askFolderApi(query, folder_name, output_format);
    console.log(res);
    if (!res.success) {
      return [[res.error.message]];
    }

    const resp = res.data;
    const nocache = resp.no_cache ?? false;
    if (resp.sources && resp.sources.length > 0) await logMessageWithCellAddress(resp.sources, invocation.address);
    const output = processOutputFormat(resp, output_format);
    if (enabled && !nocache) setCacheData(key, output);
    return output;
  } catch (error) {
    console.log(error);
    return [[error]];
  }
}

/**
 * Extracts all the relevant data from given PDF
 * @customfunction ALL_PDF_DATA
 * @helpurl https://aback-chameleon-c1f.notion.site/Mindcase-Home-161d0616625f808e9239c0a402361336?pvs=4
 * @param {string} file_name Name of the file
 * @param {CustomFunctions.Invocation} invocation Invocation object.
 * @returns {string[][]} return dynamic arrays
 * @requiresAddress
 */
export async function getPdfTables(file_name, invocation) {
  try {
    const address = invocation.address;
    const enabled = await isCacheEnabled();
    const key = getFormula("ALL_PDF_TABLES", { file_name, address });
    const cacheData = await getCacheData(key);
    if (enabled && cacheData) {
      return cacheData;
    }
    const res = await allPdfTablesApi(file_name);
    console.log(res);
    if (!res.success) {
      return [[res.error.message]];
    }

    const resp = res.data;
    const nocache = resp.no_cache ?? false;
    if (resp.sources && resp.sources.length > 0) await logMessageWithCellAddress(resp.sources, invocation.address);
    const output = processOutputFormat(resp, 3);
    if (enabled && !nocache) setCacheData(key, output);
    return output;
  } catch (error) {
    console.log(error);
    return [[error]];
  }
}

/**
 * Extracts all the relevant data from given PDF
 * @customfunction GET_EMAIL
 * @helpurl https://aback-chameleon-c1f.notion.site/Mindcase-Home-161d0616625f808e9239c0a402361336?pvs=4
 * @param {string} linkedin_url LinkedIn profile URL of the target person.
 * @param {CustomFunctions.Invocation} invocation Invocation object.
 * @returns {string} return string
 * @requiresAddress
 */
export async function getEmail(linkedin_url, invocation) {
  try {
    const address = invocation.address;
    const enabled = await isCacheEnabled();
    const key = getFormula("GET_EMAIL", { linkedin_url, address });
    const cacheData = await getCacheData(key);
    if (enabled && cacheData) {
      return cacheData;
    }
    const res = await getEmailApi(linkedin_url);
    console.log(res);
    if (!res.success) {
      return [[res.error.message]];
    }

    const resp = res.data;
    const nocache = resp.no_cache ?? false;
    if (resp.sources && resp.sources.length > 0) await logMessageWithCellAddress(resp.sources, invocation.address);
    if (enabled && !nocache) setCacheData(key, resp.value);
    return resp.value;
  } catch (error) {
    console.log(error);
    return [[error]];
  }
}
