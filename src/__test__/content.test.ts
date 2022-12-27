import * as dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

import createServer from "../utils/server";
import supertest from "supertest";
import * as ContentService from "../services/contentService";
import { SubchaptersWithStCount } from "../types/content";
import { signJwt } from "../utils/token";
import { userPayloadStub } from "./stubs/authStubs";

const app = createServer();

const subchaptersWithCount: SubchaptersWithStCount[] = [
  { id: 1, name: "test1", chapter_id: 1, st_count: 100000 },
];

describe("content", () => {
  describe("get getSubchapters route", () => {
    describe("given the subchapters have subtopics", () => {
      it("should return object with hasSubtopic", async () => {
        const chapterId = 1;
        const jwt = signJwt(userPayloadStub);
        const mockContentService = jest
          .spyOn(ContentService, "getSubchaptersWithSubtopicCount")
          .mockResolvedValueOnce(subchaptersWithCount);
        const { statusCode, body } = await supertest(app)
          .get(`/content/subchapter/${chapterId}`)
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);
        expect(body).toEqual({ subchapters: subchaptersWithCount });
        expect(mockContentService).toHaveBeenCalledWith(chapterId.toString());
      });
    });
  });
});
