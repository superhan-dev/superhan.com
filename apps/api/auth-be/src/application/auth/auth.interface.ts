export interface AuthInterface {
  validateUser(
    username: string,
    password: string,
    projectName: string
  ): Promise<any>;
}
