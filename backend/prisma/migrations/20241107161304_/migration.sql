/*
  Warnings:

  - Changed the type of `specs` on the `carsModels` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `options` on the `carsModels` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "carsModels" DROP COLUMN "specs",
ADD COLUMN     "specs" JSONB NOT NULL,
DROP COLUMN "options",
ADD COLUMN     "options" JSONB NOT NULL;
