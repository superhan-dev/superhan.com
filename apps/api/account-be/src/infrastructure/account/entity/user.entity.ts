import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'username', type: 'varchar', length: 50 })
  username: string;

  // @Column({ name: 'login_type', type: 'varchar', length: 10 })
  // loginType: string;
}
