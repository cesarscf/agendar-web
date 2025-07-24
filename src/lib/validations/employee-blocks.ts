import z from "zod"

export const employeeRecurringBlockSchema = z.object({
  id: z.string(),
  weekday: z.number(),
  startTime: z.string(),
  endTime: z.string(),
  reason: z.string().nullable(),
})
export const employeeBlockSchema = z.object({
  id: z.string(),
  startsAt: z.date(),
  endsAt: z.date(),
  reason: z.string().nullable(),
})

export const createEmployeeBlockSchema = employeeBlockSchema.omit({
  id: true,
})
export const createEmployeeRecurringBlockSchemaSchema =
  employeeRecurringBlockSchema.omit({
    id: true,
  })

export type EmployeeBlock = z.infer<typeof employeeBlockSchema>
export type CreateEmployeeBlock = z.infer<typeof createEmployeeBlockSchema>

export type EmployeeRecurringBlock = z.infer<
  typeof employeeRecurringBlockSchema
>
export type CreateEmployeeRecurringBlock = z.infer<
  typeof createEmployeeRecurringBlockSchemaSchema
>
