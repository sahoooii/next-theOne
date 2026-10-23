-- CreateEnum
CREATE TYPE "WantKids" AS ENUM ('YES', 'NO', 'NOT_SURE');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('NEVER_MARRIED', 'DIVORCED', 'WIDOWED');

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "hasKids" BOOLEAN,
ADD COLUMN     "maritalStatus" "MaritalStatus",
ADD COLUMN     "wantsKids" "WantKids";
