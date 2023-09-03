import { Request, Response } from "express";
import { internalServerErrorMsg } from "../constants";
import { getProgress, saveProgress } from "../services/progressService";

export const saveProgressHandler = async (req: Request, res: Response) => {
  const {
    chapterProgress,
    selectedTextbookIds,
    subchapterProgress,
    subtopicProgress,
  } = req.body;
  try {
    const progress = await saveProgress({
      where: {
        userId: req.auth?.payload.sub,
      },
      update: {
        chapterProgress,
        selectedTextbookIds,
        subchapterProgress,
        subtopicProgress,
      },
      create: {
        userId: req.auth?.payload.sub as string,
        chapterProgress,
        selectedTextbookIds,
        subchapterProgress,
        subtopicProgress,
      },
    });
    res.status(200).json({
      ...progress,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: internalServerErrorMsg });
  }
};

export const getProgressHandler = async (req: Request, res: Response) => {
  try {
    const progress = await getProgress(req.auth?.payload.sub as string);
    if (!!progress) {
      res.status(200).json({
        ...progress,
      });
    } else {
      res.status(404).json({
        error: "Progress does not exist for the user id",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: internalServerErrorMsg });
  }
};
