export interface Subchapters {
  id: number;
  name: string;
  chapter_id: number;
}
export interface SubchaptersWithStCount extends Subchapters {
  st_count: number;
}

export interface Subtopics {
  id: number;
  name: string;
  subchapter_id: number;
}
