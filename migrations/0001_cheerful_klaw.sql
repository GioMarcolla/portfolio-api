ALTER TABLE "education" ALTER COLUMN "position" SET NOT NULL;
ALTER TABLE "education" ALTER COLUMN "institution" SET NOT NULL;
ALTER TABLE "education" ALTER COLUMN "location_country" SET NOT NULL;
ALTER TABLE "education" ALTER COLUMN "location_state" SET NOT NULL;
ALTER TABLE "education" ALTER COLUMN "location_city" DROP NOT NULL;
ALTER TABLE "education" ALTER COLUMN "degree" SET NOT NULL;
ALTER TABLE "education" ALTER COLUMN "degree_short" DROP NOT NULL;