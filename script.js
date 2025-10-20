import { readFileAndGetEntries } from "./find_unique_entries.js";
import { findUsedSubdomains } from "./find_used_subdomains.js";
console.log("Hello world");

async function start() {
  await readFileAndGetEntries();

  await findUsedSubdomains();



  
}

start();