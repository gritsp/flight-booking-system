-- CreateTable
CREATE TABLE
    "flights" (
        "id" UUID NOT NULL,
        "origin" VARCHAR(10) NOT NULL,
        "destination" VARCHAR(10) NOT NULL,
        "departure" BIGINT NOT NULL,
        "config_id" UUID NOT NULL,
        "created_at" BIGINT NOT NULL,
        "updated_at" BIGINT NOT NULL,
        CONSTRAINT "flights_pkey" PRIMARY KEY ("id")
    );

-- CreateTable
CREATE TABLE
    "flights_config" (
        "id" UUID NOT NULL,
        "early_rate" INTEGER NOT NULL,
        "normal_rate" INTEGER NOT NULL,
        "late_rate" INTEGER NOT NULL,
        "dynamic_price_rate" INTEGER NOT NULL,
        "frequent_flyer" INTEGER NOT NULL,
        "created_at" BIGINT NOT NULL,
        "updated_at" BIGINT NOT NULL,
        CONSTRAINT "flights_config_pkey" PRIMARY KEY ("id")
    );

-- CreateTable
CREATE TABLE
    "passengers" (
        "id" UUID NOT NULL,
        "first_name" TEXT NOT NULL,
        "last_name" TEXT NOT NULL,
        "created_at" BIGINT NOT NULL,
        "updated_at" BIGINT NOT NULL,
        CONSTRAINT "passengers_pkey" PRIMARY KEY ("id")
    );

-- CreateTable
CREATE TABLE
    "seats" (
        "id" UUID NOT NULL,
        "flight_id" UUID NOT NULL,
        "type" TEXT NOT NULL,
        "price" INTEGER NOT NULL,
        "total_available" INTEGER NOT NULL,
        "total_booked" INTEGER NOT NULL,
        "created_at" BIGINT NOT NULL,
        "updated_at" BIGINT NOT NULL,
        CONSTRAINT "seats_pkey" PRIMARY KEY ("id")
    );

-- CreateTable
CREATE TABLE
    "tickets" (
        "id" UUID NOT NULL,
        "flight_id" UUID NOT NULL,
        "seat_type" TEXT NOT NULL,
        "passenger_id" UUID NOT NULL,
        "seat_row" INTEGER NOT NULL,
        "seat_column" INTEGER NOT NULL,
        "price" INTEGER NOT NULL,
        "created_at" BIGINT NOT NULL,
        "updated_at" BIGINT NOT NULL,
        CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
    );