import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const saveProgress = async (
  // userId: string,
  progy: Prisma.progressUpsertArgs
) => {
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
