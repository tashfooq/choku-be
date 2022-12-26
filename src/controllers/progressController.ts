import { Request, Response } from "express";
import { client } from "../configs/database";
import { ProgressDto } from "../types/progress";

export const saveProgress = async (req: Request, res: Response) => {
  const { selectedMaterialIds, subChapterProgress } = req.body;
  const progress = { subChapProgress: subChapterProgress };
  client.query(
    `INSERT INTO progress (subchapters, user_id, textbooks) VALUES ('${JSON.stringify(
      progress
    )}', ${
      req.user.id
    }, ARRAY [${selectedMaterialIds}]) ON CONFLICT (user_id) DO UPDATE SET subchapters = '${JSON.stringify(
      progress
    )}', textbooks = ARRAY [${selectedMaterialIds}];`,
    (err: string) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: "Database error.",
        });
      } else {
        res.status(200).send({ message: "Progress saved!" });
      }
    }
  );
};

export const fetchProgress = async (req: Request, res: Response) => {
  console.log("THIS IS THE USER ID:", req.user.id);
  try {
    const data = await client.query(
      `SELECT * FROM progress_test WHERE user_id = ${req.user.id};`
    );
    const progress = data.rows;
    if (progress.length !== 0) {
      res.status(200).json({
        ...progress,
      });
    } else {
      res.status(404).json({
        error: "Progress does not exist.",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
