import z from "zod"

export const partnerSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  establishments: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      logoUrl: z.string().nullable(),
      slug: z.string().nullable(),
    })
  ),
  subscriptions: z.array(
    z.object({
      id: z.string(),
      status: z.string(),
      endedAt: z.date().nullable(),
      createdAt: z.date(),
    })
  ),
})

export const partnerSchemaResponse = z.object({
  partner: partnerSchema,
})

export type Session = z.infer<typeof partnerSchema>
export type Partner = z.infer<typeof partnerSchemaResponse>
