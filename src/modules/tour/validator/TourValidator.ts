import { z } from "zod";

export const tourSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  image: z.string().optional(),
  location: z.string(),
  seaLevel: z.string(),
  walk: z.coerce.number().positive(),
  byCar: z.coerce.number().positive(),
  days: z.coerce.number().positive(),
  price: z.coerce.number().positive(),
  categoryId: z.string().uuid(),
});
