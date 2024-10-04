export const DomainType = {
  PROJECT: 'Project',
  USER: 'User',
} as const;

export type DomainType = (typeof DomainType)[keyof typeof DomainType];
