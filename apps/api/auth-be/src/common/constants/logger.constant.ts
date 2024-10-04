export const LoggerContext = {
  INFO: 'Info',
  WARN: 'Warn',
  ERROR: 'Error',
  DEBUG: 'Debug',
  VERBOSE: 'Verbose',
  BOOTSTRAP: 'Bootstrap',
};
export type LoggerContext = (typeof LoggerContext)[keyof typeof LoggerContext];
