import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('hash_password')
export class HashPassword {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => User, (user) => user.hashPasswords)
  // @JoinColumn({ name: 'user_id' })
  // user: User;

  @Column({ name: 'password', type: 'binary', length: 64 })
  password: Buffer;

  @Column({ name: 'salt', type: 'binary', length: 64 })
  salt: Buffer;

  @Column({ name: 'update_date', type: 'timestamp' })
  updateDate: Date;
}
