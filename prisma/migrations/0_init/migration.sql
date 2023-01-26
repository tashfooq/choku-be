-- CreateTable
CREATE TABLE "chapters" (
    "name" TEXT,
    "textbook_id" INTEGER,
    "id" SERIAL NOT NULL,

    CONSTRAINT "chapters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "progress" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "subchapter_progress" JSON,
    "selected_textbook_ids" INTEGER[],
    "subtopic_progress" JSON,

    CONSTRAINT "progress_test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subchapter" (
    "name" TEXT,
    "id" SERIAL NOT NULL,
    "chapter_id" INTEGER,

    CONSTRAINT "subchapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subtopics" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "subchapter_id" INTEGER NOT NULL,

    CONSTRAINT "subtopics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "textbooks" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "author" TEXT,
    "edition" INTEGER,

    CONSTRAINT "textbooks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" VARCHAR,
    "password" VARCHAR,
    "created_on" DATE,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "progress_test_user_id_key" ON "progress"("user_id");

-- AddForeignKey
ALTER TABLE "chapters" ADD CONSTRAINT "textbook_id_fk" FOREIGN KEY ("textbook_id") REFERENCES "textbooks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "progress" ADD CONSTRAINT "user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subchapter" ADD CONSTRAINT "chapter_id_fk" FOREIGN KEY ("chapter_id") REFERENCES "chapters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subtopics" ADD CONSTRAINT "subchapter_id_fk" FOREIGN KEY ("subchapter_id") REFERENCES "subchapter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

