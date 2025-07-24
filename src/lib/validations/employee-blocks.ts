import { z } from "zod"

export const employeeRecurringBlockSchema = z.object({
  id: z.string(),
  weekday: z.number(),
  startTime: z.string(),
  endTime: z.string(),
  reason: z.string().optional(),
})

export const employeeBlockSchema = z.object({
  id: z.string(),
  startsAt: z.date(),
  endsAt: z.date(),
  reason: z.string().optional(),
})

export const createEmployeeBlockSchema = employeeBlockSchema
  .omit({ id: true })
  .extend({
    reason: z.string().optional(),
  })

export const createEmployeeRecurringBlockSchemaSchema =
  employeeRecurringBlockSchema.omit({ id: true }).extend({
    reason: z.string().optional(),
  })

export type EmployeeBlock = z.output<typeof employeeBlockSchema>
export type CreateEmployeeBlock = z.output<typeof createEmployeeBlockSchema>
export type EmployeeRecurringBlock = z.output<
  typeof employeeRecurringBlockSchema
>
export type CreateEmployeeRecurringBlock = z.output<
  typeof createEmployeeRecurringBlockSchemaSchema
>
