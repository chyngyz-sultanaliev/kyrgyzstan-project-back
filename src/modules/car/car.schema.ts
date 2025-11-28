import { z } from "zod";

export const carSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  image: z.string().url(),
  transmission: z.string(),
  seat: z.number().min(1),
  year: z.number().min(1900).max(new Date().getFullYear()),
  engine: z.string(),
  drive: z.string(),
  fuelType: z.string(),
  pricePerDay: z.number().min(1),
  minDriverAge: z.number().min(18),
  categoryId: z.string().nonempty(),
  withDriver: z.boolean(),
});
