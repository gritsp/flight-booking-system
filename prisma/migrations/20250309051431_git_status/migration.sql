/*
  Warnings:

  - The primary key for the `flights` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `flights_config` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `passengers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `seats` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tickets` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "flights" DROP CONSTRAINT "flights_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "origin" SET DATA TYPE TEXT,
ALTER COLUMN "destination" SET DATA TYPE TEXT,
ALTER COLUMN "config_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "flights_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "flights_config" DROP CONSTRAINT "flights_config_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "flights_config_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "passengers" DROP CONSTRAINT "passengers_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "passengers_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "seats" DROP CONSTRAINT "seats_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "flight_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "seats_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "flight_id" SET DATA TYPE TEXT,
ALTER COLUMN "passenger_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "tickets_pkey" PRIMARY KEY ("id");
