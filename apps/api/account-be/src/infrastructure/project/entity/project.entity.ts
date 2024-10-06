import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('project')
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 20, unique: true })
  name: string;
}
