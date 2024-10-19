import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LoginLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'account_id' })
  accountId: number;

  @Column({ name: 'project_id' })
  projectId: number;

  @Column({ name: 'status_code', type: 'varchar', length: 10 })
  statusCode: string;

  @Column({ name: 'ip', type: 'varchar', length: 15, nullable: true })
  ip: string;

  @Column({ name: 'reason', type: 'varchar', length: 10, nullable: true })
  reason: string;
}
