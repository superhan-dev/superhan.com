import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('hash_password')
export class HashPasswordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'password', type: 'varchar', length: 128 })
  password: string;

  @Column({ name: 'salt', type: 'varchar', length: 32 })
  salt: string;

  @Column({ name: 'account_id', type: 'integer' })
  accountId: number;

  @CreateDateColumn({
    name: 'create_date',
    type: 'timestamp',
  })
  createDate: Date;

  @UpdateDateColumn({
    name: 'update_date',
    type: 'timestamp',
  })
  updateDate: Date;
}
