const client = require("../configs/database");

exports.getTextbooks = async (req, res) => {
  try {
    const data = await client.query(`SELECT * FROM textbooks`);
    const textbooks = data.rows;
    if (textbooks.length !== 0) {
      res.status(200).json({
        textbooks,
      });
    } else {
      res.status(500).json({
        error: "No textbooks exist",
      });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Database error while retreiving textbooks!" });
  }
};

exports.getTextbookById = async (req, res) => {
  const { textbookId } = req.params;
  try {
    const data = await client.query(
      `SELECT * FROM textbooks WHERE "textbook_id"='${textbookId}'`
    );
    const textbook = data.rows;
    if (textbook.length !== 0) {
      res.status(200).json({
        textbook,
      });
    } else {
      res.status(404).json({
        error: "Textbook does not exist.",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getChapters = async (req, res) => {
  const { textbookId } = req.params;
  try {
    const data = await client.query(
      `SELECT * FROM chapters WHERE "textbook_id"='${textbookId}'`
    );
    const chapters = data.rows;
    if (chapters.length !== 0) {
      res.status(200).json({
        chapters,
      });
    } else {
      res.status(404).json({
        error: "Chapters do not exist for the textbook id.",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
exports.getSubtopics = async (req, res) => {
  const {chapterId} = req.params;
  try {
    const data = await client.query(
      `SELECT * FROM subchapter WHERE "chapter_id"='${chapterId}'`
    ); 
    const subtopics = data.rows;
    if (subtopics.length !== 0) {
      res.status(200).json({
        subtopics,
      });
    } else {
      res.status(404).json({
        error: "Subtopics do not exist for the chapter id.",
      });
    }
  } catch (err) {
    console.log(err);
  } 
};
