import { z } from "zod"

export const establishmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  theme: z.string(),
  about: z.string(),
  bannerUrl: z.string(),
  slug: z.string(),
  logoUrl: z.string(),
  phone: z.string(),
  servicesPerformed: z.string(),
  activeCustomers: z.string(),
  experienceTime: z.string(),
  googleMapsLink: z.string(),
  address: z.string(),
})

export const createEstablishmentSchema = establishmentSchema.omit({ id: true })

export const updateEstablishmentSchema = establishmentSchema.partial().extend({
  id: z.string().min(1, "ID obrigatório"),
  name: z.string().min(1, "Nome obrigatório"),
  slug: z.string().min(4, "Slug obrigatório"),
})

export const availabilitySchema = z.object({
  weekday: z.number().int().min(0).max(6),
  opensAt: z.string().regex(/^\d{2}:\d{2}$/),
  closesAt: z.string().regex(/^\d{2}:\d{2}$/),
  breakStart: z.string().optional(),
  breakEnd: z.string().optional(),
})

export type Availability = z.infer<typeof availabilitySchema>
export type Establishment = z.infer<typeof establishmentSchema>
export type CreateEstablishmentRequest = z.infer<
  typeof createEstablishmentSchema
>
export type UpdateEstablishmentRequest = z.infer<
  typeof updateEstablishmentSchema
>
