-- CreateEnum
CREATE TYPE "FavoriteItemType" AS ENUM ('TOUR', 'CAR', 'HOTEL');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT,
    "password" TEXT,
    "avatar" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryTour" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoryTour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tour" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "location" TEXT NOT NULL,
    "seaLevel" TEXT NOT NULL,
    "walk" INTEGER NOT NULL,
    "byCar" INTEGER NOT NULL,
    "days" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TourDay" (
    "id" TEXT NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "tourId" TEXT NOT NULL,

    CONSTRAINT "TourDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryCar" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "images" TEXT,
    "seats" INTEGER NOT NULL,
    "withDriver" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoryCar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" JSONB,
    "transmission" TEXT,
    "seat" INTEGER NOT NULL,
    "year" INTEGER,
    "engine" TEXT,
    "drive" TEXT,
    "fuelType" TEXT,
    "pricePerDay" INTEGER NOT NULL,
    "minDriverAge" INTEGER,
    "categoryId" TEXT NOT NULL,
    "withDriver" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryHotel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoryHotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hotel" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "images" JSONB,
    "sleepingPlaces" INTEGER NOT NULL,
    "maxGuests" INTEGER NOT NULL,
    "area" INTEGER,
    "floor" INTEGER,
    "landArea" INTEGER,
    "housingType" TEXT,
    "address" TEXT,
    "pool" BOOLEAN DEFAULT false,
    "sauna" BOOLEAN DEFAULT false,
    "billiard" BOOLEAN DEFAULT false,
    "tennis" BOOLEAN DEFAULT false,
    "playstation" BOOLEAN DEFAULT false,
    "music" BOOLEAN DEFAULT false,
    "wifi" BOOLEAN DEFAULT false,
    "priceWeekday" INTEGER NOT NULL,
    "priceFriday" INTEGER NOT NULL,
    "priceSaturday" INTEGER NOT NULL,
    "priceSunday" INTEGER NOT NULL,
    "fullWeekend" INTEGER,
    "newYearPrice" INTEGER,
    "januaryPrice" INTEGER,
    "deposit" INTEGER,
    "checkIn" TEXT,
    "checkOut" TEXT,
    "importantInfo" TEXT,
    "extraFee" TEXT,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "itemType" "FavoriteItemType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tourId" TEXT,
    "carId" TEXT,
    "hotelId" TEXT,
    "rating" DOUBLE PRECISION NOT NULL,
    "comment" TEXT,
    "Images" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Tour_categoryId_idx" ON "Tour"("categoryId");

-- CreateIndex
CREATE INDEX "TourDay_tourId_idx" ON "TourDay"("tourId");

-- CreateIndex
CREATE UNIQUE INDEX "TourDay_tourId_dayNumber_key" ON "TourDay"("tourId", "dayNumber");

-- CreateIndex
CREATE INDEX "Car_categoryId_idx" ON "Car"("categoryId");

-- CreateIndex
CREATE INDEX "Hotel_categoryId_idx" ON "Hotel"("categoryId");

-- CreateIndex
CREATE INDEX "Favorite_userId_idx" ON "Favorite"("userId");

-- CreateIndex
CREATE INDEX "Favorite_itemType_itemId_idx" ON "Favorite"("itemType", "itemId");

-- AddForeignKey
ALTER TABLE "Tour" ADD CONSTRAINT "Tour_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryTour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TourDay" ADD CONSTRAINT "TourDay_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryCar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryHotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
