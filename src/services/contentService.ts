import {
  PrismaClient,
  subchapters,
  subtopics,
  textbooks,
  chapters,
} from "@prisma/client";

const prisma = new PrismaClient();

export const getAllTextbooks = async (): Promise<textbooks[]> => {
  const data = await prisma.textbooks.findMany();
  return data;
};

export const getTextbookById = async (
  textbookId: number
): Promise<textbooks | null> => {
  const data = await prisma.textbooks.findFirst({
    where: {
      id: textbookId,
    },
  });
  return data;
};

export const getTextbooksByIds = async (
  textbookIds: number[]
): Promise<chapters[]> => {
  const data = await prisma.chapters.findMany({
    where: {
      id: {
        in: textbookIds,
      },
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
): Promise<subchapters[]> => {
  const data = await prisma.subchapters.findMany({
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

export const getChaptersByIds = async (
  chapterIds: number[]
): Promise<chapters[]> => {
  const data = await prisma.chapters.findMany({
    where: {
      id: {
        in: chapterIds,
      },
    },
  });
  return data;
};

export const getSubchaptersByIds = async (
  subchapterIds: number[]
): Promise<subchapters[]> => {
  const data = await prisma.subchapters.findMany({
    where: {
      id: {
        in: subchapterIds,
      },
    },
  });
  return data;
};

export const getSubtopicsByIds = async (
  subtopicIds: number[]
): Promise<subtopics[]> => {
  const data = await prisma.subtopics.findMany({
    where: {
      id: {
        in: subtopicIds,
      },
    },
  });
  return data;
};
