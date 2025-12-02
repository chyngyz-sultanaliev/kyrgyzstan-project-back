import { Request, Response } from "express";
import prisma from "../../config/prisma";

// Body types
type TourCategoryBody = { name?: string; image?: string | null };
type CarCategoryBody = {
  name?: string;
  images?: string | null;
  seats?: number;
  withDriver?: boolean | null;
};
type HotelCategoryBody = { name?: string; image?: string | null };

//    TOUR CATEGORIES
// GET ALL
export const getTourCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await prisma.categoryTour.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.json(categories);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Ошибка при получении категорий туров" });
  }
};

// GET ONE
export const getTourCategory = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const category = await prisma.categoryTour.findUnique({
      where: { id },
      include: { tours: true },
    });
    if (!category)
      return res.status(404).json({ message: "Категория тура не найдена" });
    return res.json(category);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Ошибка при получении категории тура" });
  }
};

// CREATE
export const createTourCategory = async (
  req: Request<{}, {}, TourCategoryBody>,
  res: Response
) => {
  try {
    const { name, image } = req.body;
    if (!name) return res.status(400).json({ message: "Название обязательно" });

    const existing = await prisma.categoryTour.findFirst({ where: { name } });
    if (existing)
      return res
        .status(400)
        .json({ message: "Категория с таким названием уже существует" });

    const category = await prisma.categoryTour.create({
      data: { name, image: image ?? null },
    });
    return res.status(201).json(category);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Ошибка при создании категории тура" });
  }
};

// UPDATE
export const updateTourCategory = async (
  req: Request<{ id: string }, {}, Partial<TourCategoryBody>>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;

    const data: any = {};
    if (name !== undefined) data.name = name;
    if (image !== undefined) data.image = image ?? null;

    const category = await prisma.categoryTour.update({ where: { id }, data });
    return res.json(category);
  } catch (error) {
    console.error(error);
    if ((error as any)?.code === "P2025")
      return res.status(404).json({ message: "Категория тура не найдена" });
    return res
      .status(500)
      .json({ message: "Ошибка при обновлении категории тура" });
  }
};

// DELETE
export const deleteTourCategory = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;
    await prisma.categoryTour.delete({ where: { id } });
    return res.json({ message: "Категория тура удалена" });
  } catch (error) {
    console.error(error);
    if ((error as any)?.code === "P2025")
      return res.status(404).json({ message: "Категория тура не найдена" });
    return res
      .status(500)
      .json({ message: "Ошибка при удалении категории тура" });
  }
};

//    CAR CATEGORIES
// GET ALL
export const getCarCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await prisma.categoryCar.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.json(categories);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Ошибка при получении категорий машин" });
  }
};

// GET ONE
export const getCarCategory = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const category = await prisma.categoryCar.findUnique({
      where: { id },
      include: { cars: true },
    });
    if (!category)
      return res.status(404).json({ message: "Категория машины не найдена" });
    return res.json(category);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Ошибка при получении категории машины" });
  }
};

// CREATE
export const createCarCategory = async (
  req: Request<{}, {}, CarCategoryBody>,
  res: Response
) => {
  try {
    const { name, images, seats, withDriver } = req.body;
    if (!name || seats == null)
      return res
        .status(400)
        .json({ message: "Название и количество мест обязательны" });

    const existing = await prisma.categoryCar.findFirst({ where: { name } });
    if (existing)
      return res
        .status(400)
        .json({ message: "Категория машины с таким названием уже существует" });

    const category = await prisma.categoryCar.create({
      data: {
        name,
        images: images ?? null,
        seats,
        withDriver: withDriver ?? false,
      },
    });
    return res.status(201).json(category);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Ошибка при создании категории машины" });
  }
};

// UPDATE
export const updateCarCategory = async (
  req: Request<{ id: string }, {}, Partial<CarCategoryBody>>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { name, images, seats, withDriver } = req.body;

    const data: any = {};
    if (name !== undefined) data.name = name;
    if (images !== undefined) data.images = images ?? null;
    if (seats !== undefined) data.seats = seats;
    if (withDriver !== undefined) data.withDriver = withDriver;

    const category = await prisma.categoryCar.update({ where: { id }, data });
    return res.json(category);
  } catch (error) {
    console.error(error);
    if ((error as any)?.code === "P2025")
      return res.status(404).json({ message: "Категория машины не найдена" });
    return res
      .status(500)
      .json({ message: "Ошибка при обновлении категории машины" });
  }
};

// DELETE
export const deleteCarCategory = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;
    await prisma.categoryCar.delete({ where: { id } });
    return res.json({ message: "Категория машины удалена" });
  } catch (error) {
    console.error(error);
    if ((error as any)?.code === "P2025")
      return res.status(404).json({ message: "Категория машины не найдена" });
    return res
      .status(500)
      .json({ message: "Ошибка при удалении категории машины" });
  }
};

//    HOTEL CATEGORIES
// GET ALL
export const getHotelCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await prisma.categoryHotel.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.json(categories);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Ошибка при получении категорий отелей" });
  }
};

// GET ONE
export const getHotelCategory = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const category = await prisma.categoryHotel.findUnique({
      where: { id },
      include: { hotels: true },
    });
    if (!category)
      return res.status(404).json({ message: "Категория отеля не найдена" });
    return res.json(category);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Ошибка при получении категории отеля" });
  }
};

// CREATE
export const createHotelCategory = async (
  req: Request<{}, {}, HotelCategoryBody>,
  res: Response
) => {
  try {
    const { name, image } = req.body;
    if (!name) return res.status(400).json({ message: "Название обязательно" });

    const existing = await prisma.categoryHotel.findFirst({ where: { name } });
    if (existing)
      return res
        .status(400)
        .json({ message: "Категория отеля с таким названием уже существует" });

    const category = await prisma.categoryHotel.create({
      data: { name, image: image ?? null },
    });
    return res.status(201).json(category);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Ошибка при создании категории отеля" });
  }
};

// UPDATE
export const updateHotelCategory = async (
  req: Request<{ id: string }, {}, Partial<HotelCategoryBody>>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;

    const data: any = {};
    if (name !== undefined) data.name = name;
    if (image !== undefined) data.image = image ?? null;

    const category = await prisma.categoryHotel.update({ where: { id }, data });
    return res.json(category);
  } catch (error) {
    console.error(error);
    if ((error as any)?.code === "P2025")
      return res.status(404).json({ message: "Категория отеля не найдена" });
    return res
      .status(500)
      .json({ message: "Ошибка при обновлении категории отеля" });
  }
};

// DELETE
export const deleteHotelCategory = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;
    await prisma.categoryHotel.delete({ where: { id } });
    return res.json({ message: "Категория отеля удалена" });
  } catch (error) {
    console.error(error);
    if ((error as any)?.code === "P2025")
      return res.status(404).json({ message: "Категория отеля не найдена" });
    return res
      .status(500)
      .json({ message: "Ошибка при удалении категории отеля" });
  }
};

export default {
  getTourCategories,
  getTourCategory,
  createTourCategory,
  updateTourCategory,
  deleteTourCategory,

  getCarCategories,
  getCarCategory,
  createCarCategory,
  updateCarCategory,
  deleteCarCategory,
  
  getHotelCategories,
  getHotelCategory,
  createHotelCategory,
  updateHotelCategory,
  deleteHotelCategory,
};
