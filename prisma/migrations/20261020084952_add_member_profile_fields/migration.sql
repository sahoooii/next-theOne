-- CreateEnum
CREATE TYPE "RelationshipGoal" AS ENUM ('LONG_TERM_RELATIONSHIP', 'MARRIAGE', 'CASUAL_DATING', 'FRIENDSHIP');

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "height" DECIMAL(4,1),
ADD COLUMN     "interests" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "languages" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "relationshipGoals" "RelationshipGoal"[] DEFAULT ARRAY[]::"RelationshipGoal"[];
