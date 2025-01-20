import { config } from "../../env";

export const chatApi = async (query) => {
  try {
    const res = await fetch(`${config.BASE_URL}/askformula/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ input: query }),
    });

    const data = await res.text();
    return data;
  } catch (error) {
    console.error(error);
  }
};
