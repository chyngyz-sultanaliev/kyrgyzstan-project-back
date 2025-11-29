import { Request, Response } from "express";
import prisma from "../../config/prisma";

export const getHotel = async (req: Request, res: Response) => {
  try {
    const hotel = await prisma.hotel.findMany({
      include: {
        reviews: {
          where: {
            hotelId: { not: null },
          },
          select: {
            id: true,
            rating: true,
            comment: true,
            Images: true,
            createdAt: true,
            user: {
              select: { username: true, avatar: true },
            },
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      hotel,
    });
  } catch (error) {
    console.error("Ошибка при получении всех записей:", error);
    return res.status(500).json({
      success: false,
      error: `Ошибка при получении всех записей: ${error}`,
    });
  }
};

export const postHotel = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      images,
      sleepingPlaces,
      maxGuests,
      area,
      floor,
      landArea,
      housingType,
      address,

      pool,
      sauna,
      billiard,
      tennis,
      playstation,
      music,
      wifi,

      priceWeekday,
      priceFriday,
      priceSaturday,
      priceSunday,
      fullWeekend,
      newYearPrice,
      januaryPrice,
      deposit,

      checkIn,
      checkOut,
      importantInfo,
      extraFee,
      reviews,

      categoryId,
    } = req.body;

    if (
      !title.trim() ||
      !description.trim() ||
      !Array.isArray(images) ||
      !address.trim()
    ) {
      return res.status(400).json({
        message: "Заполните все обязательные поля!",
      });
    }

    const existingHotel = await prisma.hotel.findFirst({
      where: {
        title,
        address,
      },
    });

    if (existingHotel) {
      return res.status(400).json({
        success: false,
        message: "Такой отель уже существует!",
      });
    }

    const addHotel = await prisma.hotel.create({
      data: {
        title,
        description,
        images,
        sleepingPlaces,
        maxGuests,
        area,
        floor,
        landArea,
        housingType,
        address,

        pool,
        sauna,
        billiard,
        tennis,
        playstation,
        music,
        wifi,

        priceWeekday,
        priceFriday,
        priceSaturday,
        priceSunday,
        fullWeekend,
        newYearPrice,
        januaryPrice,
        deposit,

        checkIn,
        checkOut,
        importantInfo,
        extraFee,

        categoryId,
      },
    });

    return res.status(200).json({
      success: true,
      addHotel,
    });
  } catch (error) {
    console.error("Ошибка в postHotel:", error);
    return res.status(500).json({
      success: false,
      error: "Внутренняя ошибка сервера",
    });
  }
};

export const updateHotel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, error: "Необходимо указать ID!!!" });
    }

    const allowedFields = [
      "title",
      "description",
      "images",
      "sleepingPlaces",
      "maxGuests",
      "area",
      "landArea",
      "floor",
      "housingType",
      "address",

      "pool",
      "sauna",
      "billiard",
      "tennis",
      "playstation",
      "music",
      "wifi",

      "priceWeekday",
      "priceFriday",
      "priceSaturday",
      "priceSunday",
      "fullWeekend",
      "newYearPrice",
      "januaryPrice",
      "deposit",

      "checkIn",
      "checkOut",
      "importantInfo",
      "extraFee",
    ];

    const dataToUpdate: Record<string, any> = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        dataToUpdate[field] = req.body[field];
      }
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return res.status(400).json({
        success: false,
        error: "Нет полей для обновления",
      });
    }

    const updatedHotel = await prisma.hotel.update({
      where: { id },
      data: dataToUpdate,
    });

    res.status(200).json({ success: true, data: updatedHotel });
  } catch (error) {
    console.error("Ошибка при обновлении отеля:", error);
    res.status(500).json({
      success: false,
      error: `Ошибка при обновлении отеля: ${error}`,
    });
  }
};

export const deleteHotel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, error: "Необходимо указать ID!" });
    }

    const existing = await prisma.hotel.findUnique({ where: { id } });
    if (!existing) {
      return res
        .status(404)
        .json({ success: false, error: "Отель не найден!" });
    }

    const deletedHotel = await prisma.hotel.delete({
      where: { id },
    });

    res.status(200).json({ success: true, data: deletedHotel });
  } catch (error: any) {
    console.error("Ошибка при удаление отеля:", error);

    res.status(500).json({
      success: false,
      error: error?.message || "Внутренняя ошибка сервера!",
    });
  }
};

export default { getHotel, postHotel, updateHotel, deleteHotel };
