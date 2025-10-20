import fs from "node:fs/promises";

export async function readFileAndGetEntries() {
  try {
    // This dump is collected from:
    // https://crt.sh/?q=%.kea.dk
    const html = await fs.readFile("kea_search_dump.html", "utf-8");
    const entries = new Set();
    const re = /\b(?!www\.)[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.kea\.dk\b/g;
    const matches = html.match(re) || [];
    matches.forEach((m) => entries.add(m));

    const resultFileName = "subdomains.txt";
    fs.writeFile(resultFileName, "");
    entries.forEach((sub) => {
      fs.appendFile(resultFileName, `${sub}\n`);
    });
    console.log("wrote the results to:", resultFileName);
  } catch (err) {
    console.error(err);
  }
}

// readFileAndGetEntries();
