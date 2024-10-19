import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('project')
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'project_name', type: 'varchar', length: 20, unique: true })
  projectName: string;

  @Column({ name: 'is_deleted', type: 'tinyint', default: false })
  isDeleted: boolean;

  @CreateDateColumn({ name: 'create_date', type: 'timestamp' })
  createDate: Date;

  @UpdateDateColumn({ name: 'update_date', type: 'timestamp' })
  updateDate: Date;
}
