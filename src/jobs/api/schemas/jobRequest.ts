import z from 'zod'

const jobRequestSchema = z.object({
  location: z
    .string({ required_error: 'Location is required' })
    .min(2, { message: 'Location should be longer than 2 characters' }),
  position: z
    .string({ required_error: 'Position is required' })
    .min(3, { message: 'Position should be longer than 3 characters' }),
})

export function validateJobRequest(object: unknown) {
  return jobRequestSchema.safeParse(object)
}
