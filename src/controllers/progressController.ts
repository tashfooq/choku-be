import { RequireAuthProp } from "@clerk/clerk-sdk-node";
import { Request, Response } from "express";
import {
  internalServerErrorMsg,
  notFoundErrorMsg,
  unauthorizedErrorMsg,
} from "../constants";
import {
  getProgress,
  saveProgress,
  // getTotalProgress,
} from "../services/progressService";

export const saveProgressHandler = async (
  req: RequireAuthProp<Request>,
  res: Response
) => {
  const {
    chapterProgress,
    selectedTextbookIds,
    subchapterProgress,
    subtopicProgress,
  } = req.body;
  try {
    if (req.auth.userId == null) {
      throw new Error("User id is missing");
    }
    const progress = await saveProgress({
      where: {
        userId: req.auth.userId,
      },
      update: {
        chapterProgress,
        selectedTextbookIds,
        subchapterProgress,
        subtopicProgress,
      },
      create: {
        userId: req.auth.userId,
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
    console.error(err);
    res.status(500).json({ error: internalServerErrorMsg });
  }
};

export const getProgressHandler = async (
  req: RequireAuthProp<Request>,
  res: Response
) => {
  try {
    if (req.auth.userId == null) {
      res
        .status(unauthorizedErrorMsg.code)
        .json({ error: unauthorizedErrorMsg });
      throw new Error(unauthorizedErrorMsg.msg);
    }
    const progress = await getProgress(req.auth.userId);
    if (!!progress) {
      res.status(200).json(progress);
    } else {
      res.status(notFoundErrorMsg.code).json({ error: notFoundErrorMsg });
    }
  } catch (err) {
    console.error(err);
    res
      .status(internalServerErrorMsg.code)
      .json({ error: internalServerErrorMsg });
  }
};

// export const getTotalProgressPercentageHandler = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const totalProgress = await getTotalProgress(
//       req.auth?.payload.sub as string
//     );
//     res.status(200).json({ totalProgress });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: internalServerErrorMsg });
//   }
// };
