import dns from "dns/promises";
import fs from "fs";
import readline from "readline";

export async function findUsedSubdomains() {
  try {
    const inputFile = "subdomains.txt";
    const outputFile = "resolved-subdomains.txt";

    const promises = [];
    const fileStream = fs.createReadStream(inputFile);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      const subdomain = line.trim();
      if (subdomain) {
        promises.push(
          dns
            .resolve(subdomain)
            .then((ip) => ({ subdomain, ip }))
            .catch(() => ({ subdomain, ip: null })),
        );
      }
    }

    const results = await Promise.all(promises);

    // Filter out unresolved subdomains
    const resolved = results.filter((r) => r.ip);

    // Log to console
    resolved.forEach((r) => console.log(r));

    // Save to file
    const outputData = resolved
      .map((r) => `${r.subdomain} -> ${r.ip.join(", ")}`)
      .join("\n");
    fs.writeFileSync(outputFile, outputData, "utf-8");

    console.log(`Results saved to ${outputFile}`);
  } catch (error) {
    console.error("Error resolving subdomains:", error);
  }
}

// import dns from "dns/promises";
// import fs from "fs";
// import readline from "readline";

// const promises = [];

// const fileStream = fs.createReadStream("subdomains.txt");

// const rl = readline.createInterface({
//   input: fileStream,
//   crlfDelay: Infinity,
// });

// for await (const line of rl) {
//   const subdomain = line.trim();
//   if (subdomain) {
//     promises.push(
//       dns
//         .resolve(`${subdomain}`)
//         .then((ip) => ({ subdomain, ip }))
//         .catch(() => ({ subdomain, ip: null })),
//     );
//   }
// }

// const results = await Promise.all(promises);
// results.forEach((result) => {
//   if (result.ip) console.log(result);
// });
