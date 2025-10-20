import dns from "dns";
import fs from "fs";
import csv from "csv-parser";

import dns from "dns/promises"; 
import fs from "fs";
import csv from "csv-parser";

const promises = [];

fs.createReadStream("subdomains-10000.txt")
  .pipe(csv())
  .on("data", (subdomain) => {
    promises.push(
      dns
        .resolve(`${subdomain}.mega-bank.com`)
        .then((ip) => ({ subdomain, ip }))
        .catch(() => ({ subdomain, ip: null }))
    );
  })
  .on("end", async () => {
    const results = await Promise.all(promises);
    results.forEach((result) => {
      if (result.ip) console.log(result);
    });
  });
