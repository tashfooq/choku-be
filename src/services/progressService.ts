import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const setProgress = async (
  userId: number,
  progy: Prisma.progressUpsertWithoutUsersInput
) => {
  const data = await prisma.progress.upsert({
    where: {
      userId,
    },
    update: {
      subchapterProgress: progy.update.subchapterProgress,
      subtopicProgress: progy.update.subtopicProgress,
      selectedTextbookIds: progy.update.selectedTextbookIds,
    },
    create: {
      userId,
      subchapterProgress: progy.create.subchapterProgress,
      subtopicProgress: progy.create.subtopicProgress,
      selectedTextbookIds: progy.create.selectedTextbookIds,
    },
  });
  return data;
};

export const getProgress = async (userId: number) => {
  const data = await prisma.progress.findFirst({
    where: { userId },
  });
  return data;
};
