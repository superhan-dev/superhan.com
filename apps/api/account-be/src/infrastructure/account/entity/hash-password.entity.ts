import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hash_password')
export class HashPasswordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => User, (user) => user.hashPasswords)
  // @JoinColumn({ name: 'user_id' })
  // user: User;

  @Column({ name: 'password', type: 'varchar', length: 128 })
  password: string;

  @Column({ name: 'salt', type: 'varchar', length: 32 })
  salt: string;

  @Column({ name: 'user_id', type: 'integer' })
  userId: number;

  @Column({
    name: 'update_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateDate: Date;
}
