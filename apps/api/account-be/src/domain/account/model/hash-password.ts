export class HashPassword {
  userId: number;
  password: string;
  salt: string;

  constructor(props: HashPassword) {
    Object.assign(this, props);
  }
}
