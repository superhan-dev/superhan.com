export const ProjectType = {
  SUPERHAN: 'Superhan',
  // OTHER: 'OTHER',
} as const;

export type ProjectType = (typeof ProjectType)[keyof typeof ProjectType];
