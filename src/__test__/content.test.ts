import * as dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

import createServer from "../utils/server";
import supertest from "supertest";
import * as ContentService from "../services/contentService";
import { signJwt } from "../utils/token";
import { userPayloadStub } from "./stubs/authStubs";
import { subtopics } from "@prisma/client";

const app = createServer();

// move these to a stub file

const subchaptersWithCount = [
  { id: 1, name: "test1", chapterId: 1, _count: { subtopics: 5 } },
];

const subtopics: subtopics[] = [
  {
    id: 1,
    name: "subtopic with subchapterid 3",
    subchapterId: 3,
  },
  {
    id: 2,
    name: "subtopic with subchapterid 3",
    subchapterId: 3,
  },
  {
    id: 3,
    name: "subtopic with subchapterid 3",
    subchapterId: 3,
  },
  {
    id: 4,
    name: "subtopic with subchapterid 3",
    subchapterId: 3,
  },
];

describe("content", () => {
  describe("get subchapters route", () => {
    describe("given the subchapters have subtopics", () => {
      it("should return object with st_count", async () => {
        const chapterId = 1;
        const jwt = signJwt(userPayloadStub);
        const mockContentService = jest
          .spyOn(ContentService, "getSubchaptersWithSubtopicCount")
          .mockResolvedValueOnce(subchaptersWithCount);
        const { statusCode, body } = await supertest(app)
          .get(`/content/subchapter/${chapterId}`)
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);
        expect(body).toEqual(subchaptersWithCount);
        expect(mockContentService).toHaveBeenCalledWith(chapterId);
      });
    });
  });
  describe("get subtopics route", () => {
    describe("given the proper params are used", () => {
      it("should return array with 4 item", async () => {
        const subchapterId = 1;
        const jwt = signJwt(userPayloadStub);
        const mockContentService = jest
          .spyOn(ContentService, "getSubtopics")
          .mockResolvedValueOnce(subtopics);
        const { statusCode, body } = await supertest(app)
          .get(`/content/subtopic/${subchapterId}`)
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);
        expect(body).toEqual(subtopics);
        expect(mockContentService).toHaveBeenCalledWith(subchapterId);
      });
    });
  });
});
