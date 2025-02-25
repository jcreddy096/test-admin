
import { z } from "zod";

export const resourceSchema = z.object({
  id: z.number().int().positive(), 
  name: z.string().min(1, "Name is required"), 
  year: z.number().int().min(1900).max(new Date().getFullYear()), 
  color: z.string().regex(/^#([0-9A-Fa-f]{6})$/, "Invalid color format"), 
  pantone_value: z.string().min(1, "Pantone value is required"), 
});


export type ResourceType = z.infer<typeof resourceSchema>;


