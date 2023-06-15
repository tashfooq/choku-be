import fs from "fs";
import { parse } from "csv-parse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedDatabase() {
  // Read and parse CSV files
  const file1Data = await readCSV("choku-data/t.csv");
  const file2Data = await readCSV("choku-data/c.csv");
  const file3Data = await readCSV("choku-data/subc.csv");
  const file4Data = await readCSV("choku-data/subt.csv");
  // ... Read other CSV files as needed

  // Insert data into the database
  await prisma.textbooks.createMany({
    data: file1Data.map((row) => ({
      name: row[0],
      author: row[1],
      edition: row[2],
    })),
  });

  await prisma.chapters.createMany({
    data: file2Data.map((row) => ({
      name: row[0],
      textbookId: Number(row[1]),
    })),
  });

  await prisma.subchapters.createMany({
    data: file3Data.map((row) => ({
      name: row[0],
      chapterId: Number(row[1]),
    })),
  });

  await prisma.subtopics.createMany({
    data: file4Data.map((row) => ({
      name: row[0],
      subchapterId: Number(row[1]),
    })),
  });

  // ... Insert data for other models as needed

  console.log("Seeding completed successfully");
}

async function readCSV(filename: string): Promise<string[][]> {
  const csvData = await fs.promises.readFile(filename, "utf8");
  return new Promise((resolve, reject) => {
    parse(csvData, { delimiter: "," }, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

seedDatabase()
  .catch((err) => console.error(err))
  .finally(async () => {
    await prisma.$disconnect();
  });
