import { Request, Response } from "express";
import prisma from "../../config/prisma";

const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.categoryCar.findMany({
      include: { cars: true },
    });
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error getting categories" });
  }
};

const postCategory = async (req: Request, res: Response) => {
  try {
    const { name, images, seats, withDriver } = req.body;

    const category = await prisma.categoryCar.create({
      data: { name, images, seats, withDriver },
    });

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating category" });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const exists = await prisma.categoryCar.findUnique({ where: { id } });
    if (!exists) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    const deleted = await prisma.categoryCar.delete({ where: { id } });
    res.status(200).json({ success: true, data: deleted });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting category" });
  }
};

const putCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const { name, images, seats, withDriver } = req.body;

    const updated = await prisma.categoryCar.update({
      where: { id },
      data: { name, images, seats, withDriver },
    });

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating category" });
  }
};

export default {
  getCategories,
  postCategory,
  deleteCategory,
  putCategory,
};
