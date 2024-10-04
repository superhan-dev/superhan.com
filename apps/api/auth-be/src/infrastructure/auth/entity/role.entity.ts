import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'role_name', type: 'varchar', length: 10 })
  roleName: string;

  @Column({ name: 'readable', type: 'tinyint' })
  readable: boolean;

  @Column({ name: 'writable', type: 'tinyint' })
  writable: boolean;

  @Column({ name: 'updatable', type: 'tinyint' })
  updatable: boolean;

  @Column({ name: 'deletable', type: 'tinyint' })
  deletable: boolean;

  @Column({ name: 'creatable', type: 'tinyint' })
  creatable: boolean;
}
