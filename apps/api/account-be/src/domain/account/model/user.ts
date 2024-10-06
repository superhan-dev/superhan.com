export class User {
  userId: number;
  username: string;

  constructor(user: User) {
    Object.assign(this, user);
  }
}
