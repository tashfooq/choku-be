import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const saveProgress = async (progy: Prisma.progressUpsertArgs) => {
  const data = await prisma.progress.upsert({
    where: {
      userId: progy.where.userId,
    },
    update: {
      chapterProgress: progy.update.chapterProgress,
      subchapterProgress: progy.update.subchapterProgress,
      subtopicProgress: progy.update.subtopicProgress,
      selectedTextbookIds: progy.update.selectedTextbookIds,
    },
    create: {
      userId: progy.create.userId,
      chapterProgress: progy.create.chapterProgress,
      subchapterProgress: progy.create.subchapterProgress,
      subtopicProgress: progy.create.subtopicProgress,
      selectedTextbookIds: progy.create.selectedTextbookIds,
    },
  });
  return data;
};

export const getProgress = async (userId: string) => {
  const data = await prisma.progress.findFirst({
    where: { userId },
  });
  return data;
};

export const getTotalProgress = async (userId: string) => {
  const data = await prisma.progress.findFirst({
    where: { userId },
  });

  if (!data) {
    return 0;
  }

  const { selectedTextbookIds } = data;
  const chapters = await prisma.chapters.findMany({
    where: {
      textbookId: { in: selectedTextbookIds },
    },
  });

  const chapterIds = chapters.map((chapter) => chapter.id);
  const subchapters = await prisma.subchapters.findMany({
    where: {
      chapterId: { in: chapterIds },
    },
  });

  const subchapterIds = subchapters.map((subchapter) => subchapter.id);
  const subtopics = await prisma.subtopics.findMany({
    where: {
      subchapterId: { in: subchapterIds },
    },
  });

  const totalSelected = [
    ...data.chapterProgress,
    ...data.subchapterProgress,
    ...data.subtopicProgress,
  ].length;
  const total = [
    ...chapterIds,
    ...subchapterIds,
    ...subtopics.map(({ id }) => id),
  ].length;

  const percentage = (totalSelected / total) * 100;

  return percentage.toFixed(2);
};
