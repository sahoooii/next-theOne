-- CreateEnum
CREATE TYPE "SearchGender" AS ENUM ('MALE', 'FEMALE', 'NON_BINARY', 'ANY');

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "searchGender" "SearchGender" NOT NULL DEFAULT 'ANY';
