import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account')
// @Unique(['id', 'project_id'])
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'username', type: 'varchar', length: 50 })
  username: string;

  @Column({ name: 'project_id', type: 'int' })
  projectId: number;

  // @Column({ name: 'login_type', type: 'varchar', length: 10 })
  // loginType: string;
}
