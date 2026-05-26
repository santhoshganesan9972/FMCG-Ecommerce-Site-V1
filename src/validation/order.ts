import { z } from "zod";

export const orderItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  productName: z.string().min(1, "Product name is required"),
  quantity: z
    .number()
    .int("Quantity must be a whole number")
    .positive("Quantity must be greater than 0")
    .max(999, "Quantity exceeds maximum allowed"),
  price: z
    .number()
    .nonnegative("Price cannot be negative"),
});

export const orderSchema = z.object({
  customerId: z.string().min(1, "Customer is required"),
  customerName: z.string().min(1, "Customer name is required"),
  email: z
    .string()
    .email("Invalid email address")
    .optional(),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-()]{7,15}$/, "Invalid phone number")
    .optional(),
  items: z
    .array(orderItemSchema)
    .min(1, "At least one item is required")
    .max(100, "Maximum 100 items per order"),
  deliveryAddress: z
    .string()
    .min(5, "Delivery address must be at least 5 characters")
    .max(500, "Delivery address must be at most 500 characters"),
  notes: z
    .string()
    .max(1000, "Notes must be at most 1000 characters")
    .optional(),
});

export type OrderInput = z.infer<typeof orderSchema>;
export type OrderItemInput = z.infer<typeof orderItemSchema>;
