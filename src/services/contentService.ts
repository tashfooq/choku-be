import { client } from "../configs/database";
import { SubchaptersWithStCount } from "../types/content";

export const getSubchaptersWithSubtopicCount = async (
  chapterId: number
): Promise<SubchaptersWithStCount[]> => {
  try {
    const data = await client.query(
      `select * , (select count(*) from public.subtopics st where st.subchapter_id = sc.id) as st_count from public.subchapter sc where sc.chapter_id = ${chapterId}`
    );
    return data.rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
