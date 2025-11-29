import { Request, Response } from "express";
import prisma from "../../config/prisma";

const getTour = async (req: Request, res: Response) => {
  try {
    const tour = await prisma.tour.findMany({
      include: {
        reviews: {
          where: {
            tourId: { not: null },
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
        tourDays: true,
      },
    });
    res.status(200).json({
      success: true,
      tour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error in getTour: ${error}`,
    });
  }
};

const postTour = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      image,
      location,
      seaLevel,
      walk,
      byCar,
      days,
      price,
      categoryId,
    } = req.body;
    if (!title.trim()) {
      return res.status(401).json({
        success: false,
        message: "Названия обязательное!!!",
      });
    }
    // Проверка: такой тур уже есть?
    const exists = await prisma.tour.findFirst({
      where: { title },
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Такой тур уже существует!",
      });
    }

    const addTour = await prisma.tour.create({
      data: {
        title,
        description,
        image,
        location,
        seaLevel,
        walk,
        byCar,
        days,
        price,
        categoryId,
      },
    });

    return res.status(201).json({
      success: true,
      data: addTour,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Error in postTour: ${error}`,
    });
  }
};

const putTour = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      image,
      location,
      seaLevel,
      walk,
      byCar,
      days,
      price,
      categoryId,
    } = req.body;

    // 1) Проверяем, существует ли тур
    const exists = await prisma.tour.findUnique({
      where: { id },
    });

    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "Тур с таким ID не найден!",
      });
    }

    // 2) Обновляем
    const updatedTour = await prisma.tour.update({
      where: { id },
      data: {
        title,
        description,
        image,
        location,
        seaLevel,
        walk,
        byCar,
        days,
        price,
        categoryId,
      },
    });

    return res.status(200).json({
      success: true,
      data: updatedTour,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Ошибка при обновлении тура: ${error}`,
    });
  }
};

const deleteTour = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Не передан tourId!!!",
      });
    }

    const exists = await prisma.tour.findUnique({
      where: { id },
    });
    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "Тур с таким ID не найдена!!!",
      });
    }
    const delTour = await prisma.tour.delete({
      where: { id },
    });
    return res.status(200).json({
      success: true,
      message: "Тур успешно удалён!!!",
      delTour,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Ошибка при удалении: ${error}`,
    });
  }
};

// TOUR-DAY
const getTourDay = async (req: Request, res: Response) => {
  try {
    const tourDay = await prisma.tourDay.findMany();
    return res.status(200).json({
      success: true,
      data: tourDay,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Error in getTourDay: ${error}`,
    });
  }
};

const postTourDay = async (req: Request, res: Response) => {
  try {
    const { dayNumber, description, tourId } = req.body;
    if (dayNumber == null || !description?.trim() || !tourId?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Обязательные поля!!!",
      });
    }

    const addDay = await prisma.tourDay.create({
      data: {
        dayNumber,
        description,
        tourId,
      },
    });
    return res.status(200).json({
      success: true,
      data: addDay,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Error in postTourDay: ${error}`,
    });
  }
};

const putTourDay = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const { dayNumber, description, tourId } = req.body;

    const exists = await prisma.tourDay.findUnique({
      where: { id },
    });

    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "TourDay с таким ID не найден!",
      });
    }
    const updatedTourDay = await prisma.tourDay.update({
      where: { id },
      data: {
        dayNumber,
        description,
        tourId,
      },
    });
    return res.status(200).json({
      success: true,
      data: updatedTourDay,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Error in putTourday: ${error}`,
    });
  }
};

const deleteTourday = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Не передан tourdayId!!!",
      });
    }
    const exists = await prisma.tourDay.findUnique({
      where: { id },
    });
    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "TourDay с таким ID не найдена!!!",
      });
    }
    const delTour = await prisma.tourDay.delete({
      where: { id },
    });
    return res.status(200).json({
      success: true,
      message: "TourDay успешно удалён!!!",
      delTour,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Ошибка при удалении: ${error}`,
    });
  }
};

export default {
  getTour,
  postTour,
  putTour,
  deleteTour,

  getTourDay,
  postTourDay,
  putTourDay,
  deleteTourday,
};
