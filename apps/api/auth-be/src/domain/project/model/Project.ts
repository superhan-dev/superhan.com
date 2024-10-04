export class Project {
  id: number;
  name: string;

  constructor({ id, name }: Project) {
    this.id = id;
    this.name = name;
  }
}
