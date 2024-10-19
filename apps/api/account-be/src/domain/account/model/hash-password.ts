export class HashPassword {
  accountId: number;
  password: string;
  salt: string;

  constructor(props: HashPassword) {
    Object.assign(this, props);
  }
}
