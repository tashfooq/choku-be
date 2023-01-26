import { Request, Response } from "express";
import { getProgress, setProgress } from "../services/progressService";

export const saveProgress = async (req: Request, res: Response) => {
  const { selectedTextbookIds, subchapterProgress, subtopicProgress } =
    req.body;
  try {
    const progress = await setProgress(req.user.id, {
      update: {
        selectedTextbookIds,
        subchapterProgress,
        subtopicProgress,
      },
      create: {
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
  }
};

export const fetchProgress = async (req: Request, res: Response) => {
  console.log("THIS IS THE USER ID:", req.user.id);
  try {
    const progress = await getProgress(req.user.id);
    if (!!progress) {
      res.status(200).json({
        ...progress,
      });
    } else {
      res.status(404).json({
        error: "Progress does not exist",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
