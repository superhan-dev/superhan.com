import { RoleEnum } from '@/common/enum/role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('role')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'role_name', type: 'varchar', length: 10, unique: true })
  roleName: RoleEnum;
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

  @Column({ name: 'is_deleted', type: 'tinyint', default: false })
  isDeleted: boolean;

  @CreateDateColumn({ name: 'create_date', type: 'timestamp' })
  createDate: Date;

  @UpdateDateColumn({ name: 'update_date', type: 'timestamp' })
  updateDate: Date;
}
