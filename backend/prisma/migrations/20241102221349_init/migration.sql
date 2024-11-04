/*
  Warnings:

  - Added the required column `profileId` to the `PostPicture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PostPicture" ADD COLUMN     "profileId" INTEGER NOT NULL;
