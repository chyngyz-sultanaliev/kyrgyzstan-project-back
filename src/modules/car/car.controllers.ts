import { Request, Response } from "express";
import prisma from "../../config/prisma";

const getCar = async (req: Request, res: Response) => {
  try {
    const car = await prisma.car.findMany();
    res.status(200).json({
      success: true,
      car,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in getCar",
    });
  }
};

const postCar = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      image,
      transmission,
      seat,
      year,
      engine,
      drive,
      fuelType,
      pricePerDay,
      minDriverAge,
      categoryId,
      withDriver,
    } = req.body;

    const addCar = await prisma.car.create({
      data: {
        title,
        description,
        image,
        transmission,
        seat,
        year,
        engine,
        drive,
        fuelType,
        pricePerDay,
        minDriverAge,
        categoryId,
        withDriver,
      },
    });

    return res.status(200).json({
      success: true,
      data: addCar,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Error in postCar: ${error}`,
    });
  }
};

const deleteCar = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Не передан carId",
      });
    }

    const exists = await prisma.car.findUnique({
      where: { id },
    });

    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "Машина с таким ID не найдена",
      });
    }

    const deleted = await prisma.car.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Машина успешно удалена",
      data: deleted,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `Ошибка при удалении: ${error.message}`,
    });
  }
};

const putCar = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const {
      title,
      description,
      image,
      transmission,
      seat,
      year,
      engine,
      drive,
      fuelType,
      pricePerDay,
      minDriverAge,
      categoryId,
      withDriver,
    } = req.body;

    const index = await prisma.car.update({
      where: { id },
      data: {
        title,
        description,
        image,
        transmission,
        seat,
        year,
        engine,
        drive,
        fuelType,
        pricePerDay,
        minDriverAge,
        categoryId,
        withDriver,
      },
    });

    res.status(200).json({
      success: true,
      index,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Ошибка при обнавлении данных: ${error}`,
    });
  }
};

const patchCar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Car id обязателен" });
    }

    const updatedData = { ...req.body };

    const updatedCar = await prisma.car.update({
      where: { id },
      data: updatedData,
    });

    res.status(200).json({
      success: true,
      car: updatedCar,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `Ошибка при обновлении данных: ${error.message || error}`,
    });
  }
};

const crudAllCar = (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

export default {
  getCar,
  postCar,
  deleteCar,
  putCar,
  patchCar,
};
