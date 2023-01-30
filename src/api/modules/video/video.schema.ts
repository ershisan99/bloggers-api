import { z } from 'zod';

const resolutions = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'] as const;

export const VideoSchema = z.object({
  id: z.number(),
  title: z.string({ required_error: 'Title is required' }).max(40, { message: 'Title is too long' }),
  author: z.string({ required_error: 'Author is required' }).max(20, { message: 'Author is too long' }),
  canBeDownloaded: z.boolean().optional(),
  minAgeRestriction: z.number().nullish(),
  createdAt: z.string(),
  publicationDate: z.string().optional(),
  availableResolutions: z.array(z.enum(resolutions, {
    invalid_type_error: 'Invalid resolution',
    required_error: 'At least one resolution is required',
  })),
});

export type Video = z.infer<typeof VideoSchema>;



export const CreateVideoInputSchema = VideoSchema.omit({ id: true, createdAt: true });
export type CreateVideoInput = z.infer<typeof CreateVideoInputSchema>;