import { Response, Request } from "express";
import prisma from "../../config/prisma";
import { tourSchema } from "./validator/TourValidator";

const getTour = async (req: Request, res: Response) => {
  try {
    const tours = await prisma.tour.findMany({
      include: {
        category: true,
        tourDays: true,
        reviews: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({
      success: true,
      data: tours,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in getTour: ${error}`,
    });
  }
};

const postTour = async (req: Request, res: Response) => {
  try {
    const validated = tourSchema.parse(req.body);

    const categoryExists = await prisma.categoryTour.findUnique({
      where: { id: validated.categoryId },
    });

    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        message: "Категория табылган жок",
      });
    }

    const newTour = await prisma.tour.create({
      data: validated,
    });

    return res.status(201).json({
      success: true,
      data: newTour,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Error in postTour: ${error}`,
    });
  }
};

const patchTour = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID талап кылынат",
      });
    }

    // 1) Тур бар-жогун текшерүү
    const exists = await prisma.tour.findUnique({
      where: { id },
    });

    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "Тур табылган жок!",
      });
    }

    // 2) Жаңылануучу маалыматты текшерүү
    // ⚠️ parse эмес, partial.parse колдонобуз PATCH үчүн
    const validated = tourSchema.partial().parse(req.body);

    // 3) Эгер categoryId келсе — категорияны текшерүү
    if (validated.categoryId) {
      const categoryExists = await prisma.categoryTour.findUnique({
        where: { id: validated.categoryId },
      });

      if (!categoryExists) {
        return res.status(400).json({
          success: false,
          message: "Категория табылган жок",
        });
      }
    }

    // 4) Турду жаңыртуу
    const updatedTour = await prisma.tour.update({
      where: { id },
      data: validated,
    });

    return res.status(200).json({
      success: true,
      message: "Тур ийгиликтүү жаңыртылды",
      data: updatedTour,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in patchTour: ${error}`,
    });
  }
};

const putTour = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID талап кылынат",
      });
    }
    const exists = await prisma.tour.findUnique({
      where: { id },
    });
    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "Тур табылган жок!",
      });
    }
    const validated = tourSchema.parse(req.body);
    if (validated.categoryId) {
      const categoryExists = await prisma.categoryTour.findUnique({
        where: { id: validated.categoryId },
      });

      if (!categoryExists) {
        return res.status(400).json({
          success: false,
          message: "Категория табылган жок",
        });
      }
    }
    const updatedTour = await prisma.tour.update({
      where: { id },
      data: validated,
    });

    return res.status(200).json({
      success: true,
      message: "Тур ийгиликтүү жаңыртылды",
      data: updatedTour,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in putTour: ${error}`,
    });
  }
};

const deleteTour = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID талап кылынат",
      });
    }

    const exists = await prisma.tour.findUnique({
      where: { id },
    });

    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "Тур табылган жок",
      });
    }

    const deleted = await prisma.tour.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Тур өчүрүлдү",
      data: deleted,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in deleteTour: ${error}`,
    });
  }
};

export default { getTour, postTour, deleteTour, patchTour, putTour };
