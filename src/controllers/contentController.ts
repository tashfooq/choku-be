import { Request, Response } from "express";
import { internalServerErrorMsg } from "../constants";
import {
  getAllTextbooks,
  getSubchaptersWithSubtopicCount,
  getChapters,
  getSubtopics,
  getTextbooksById,
  getChaptersByIds,
  getSubchaptersByIds,
  getSubtopicsByIds,
} from "../services/contentService";
import { text } from "stream/consumers";

interface MultipleIdQueryParams {
  ids: string[];
}

export const getAllTextbooksHandler = async (req: Request, res: Response) => {
  try {
    const textbooks = await getAllTextbooks();
    if (textbooks.length !== 0) {
      res.status(200).json(textbooks);
    } else {
      res.status(404).json({
        error: "No textbooks exists",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: internalServerErrorMsg });
  }
};

export const getTextbookByIdHandler = async (req: Request, res: Response) => {
  const { textbookId } = req.params;
  try {
    const textbook = await getTextbooksById(Number(textbookId));
    if (typeof textbook != "undefined") {
      res.status(200).json({
        textbook,
      });
    } else {
      res.status(404).json({
        error: "Textbook does not exist",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: internalServerErrorMsg });
  }
};

export const getChaptersHandler = async (req: Request, res: Response) => {
  const { textbookId } = req.params;
  try {
    const chapters = await getChapters(Number(textbookId));
    if (chapters.length !== 0) {
      res.status(200).json({
        chapters,
      });
    } else {
      res.status(404).json({
        error: "Chapters do not exist for the textbook id",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: internalServerErrorMsg });
  }
};

export const getChaptersByIdsHanbler = async (
  req: Request<{}, {}, {}, MultipleIdQueryParams>,
  res: Response
) => {
  const { ids } = req.query;
  if (ids === undefined || ids.length === 0) {
    res.status(200).json({ chapters: [] });
    return;
  }
  try {
    let parsedIds = ids.map((id) => Number(id));
    const chapters = await getChaptersByIds(parsedIds);
    console.log(chapters);
    res.status(200).json({ chapters });
  } catch (err) {
    console.log(err);
  }
};

export const getSubchaptersHandler = async (req: Request, res: Response) => {
  const { chapterId } = req.params;
  try {
    const subchapters = await getSubchaptersWithSubtopicCount(
      Number(chapterId)
    );
    if (subchapters.length !== 0) {
      console.log({ subchapters });
      res.status(200).json({ subchapters });
    } else {
      res.status(404).json({
        error: "Subchapters do not exist for the chapter id",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: internalServerErrorMsg });
  }
};

export const getSubchaptersByIdsHanbler = async (
  req: Request<{}, {}, {}, MultipleIdQueryParams>,
  res: Response
) => {
  const { ids } = req.query;
  if (ids === undefined || ids.length === 0) {
    res.status(200).json({ chapters: [] });
    return;
  }
  try {
    let parsedIds = ids.map((id) => Number(id));
    const subchapters = await getSubchaptersByIds(parsedIds);
    res.status(200).json({ subchapters });
  } catch (err) {
    console.log(err);
  }
  return ids;
};

export const getSubtopicsHandler = async (req: Request, res: Response) => {
  const { subchapterId } = req.params;
  try {
    const subtopics = await getSubtopics(Number(subchapterId));
    console.log(subtopics);
    if (subtopics.length !== 0) {
      res.status(200).json({ subtopics });
    } else {
      res.status(404).json({
        error: "Subtopics do not exist for the subchapter id",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: internalServerErrorMsg });
  }
};

export const getSubtopicsByIdsHandler = async (
  req: Request<{}, {}, {}, MultipleIdQueryParams>,
  res: Response
) => {
  const { ids } = req.query;
  if (ids === undefined || ids.length === 0) {
    res.status(200).json({ chapters: [] });
    return;
  }
  try {
    let parsedIds = ids.map((id) => Number(id));
    const subtopics = await getSubtopicsByIds(parsedIds);
    res.status(200).json({ subtopics });
  } catch (err) {
    console.log(err);
  }
  return ids;
};
