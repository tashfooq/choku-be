export interface Progress {
  id: number;
  passes?: number;
}

export interface ProgressDto {
  subChapProg?: Progress;
  subTopicProg?: Progress;
}
