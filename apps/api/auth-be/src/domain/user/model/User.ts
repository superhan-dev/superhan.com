export class User {
  userId: number;
  username: string;
  password: string;

  constructor(user:User){
    this.userId = user.userId;
    this.username = user.username;
    this.password = user.password;
  }
}
