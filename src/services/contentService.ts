import {
  PrismaClient,
  subchapter,
  subtopics,
  textbooks,
  chapters,
} from "@prisma/client";

const prisma = new PrismaClient();

export const getAllTextbooks = async (): Promise<textbooks[]> => {
  const data = await prisma.textbooks.findMany();
  return data;
};

export const getTextbooksById = async (
  textbookId: number
): Promise<textbooks | null> => {
  const data = await prisma.textbooks.findFirst({
    where: {
      id: textbookId,
    },
  });
  return data;
};

export const getChapters = async (textbookId: number): Promise<chapters[]> => {
  const data = await prisma.chapters.findMany({
    where: {
      textbookId,
    },
  });
  return data;
};

export const getSubchaptersWithSubtopicCount = async (
  chapterId: number
): Promise<subchapter[]> => {
  const data = await prisma.subchapter.findMany({
    where: {
      chapterId,
    },
    include: {
      _count: {
        select: {
          subtopics: true,
        },
      },
    },
  });
  return data;
};

export const getSubtopics = async (
  subchapterId: number
): Promise<subtopics[]> => {
  const data = await prisma.subtopics.findMany({
    where: {
      subchapterId,
    },
  });
  return data;
};