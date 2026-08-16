import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Papa from "papaparse";

import { prisma } from "../lib/prisma";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "companies.csv");

try {
    const data = await fs.readFile(filePath, "utf-8");

    const results = Papa.parse<string[]>(data, {
        skipEmptyLines: true,
    });

    const companies = results.data.slice(1);

    for (const selectedCompany of companies) {
        const company = await prisma.company.create({
            data: {
                symbol: selectedCompany[0],
                name: selectedCompany[1],
                sector: selectedCompany[2],
                subindustry: selectedCompany[3],
                headquarters: selectedCompany[4],
                founded_year: parseInt(selectedCompany[7]),
            },
        });

        console.log(`Company created: ${company.symbol}`);
    }
} catch (error) {
    console.error("Error:", error);
} finally {
    await prisma.$disconnect();
}