const client = require("../configs/database");

const saveProgress = async (req, res) => {
  console.log(req.body);
  const { userId, subtopics } = req.body;
  const data = await client.query(
    `INSERT INTO progress (subtopics, user_id) VALUES (${userId}, ${subtopics})`
  );
};

const fetchProgress = async () => {};

module.exports = { saveProgress, fetchProgress };
