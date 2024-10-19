import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_role')
export class AccountRoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'role_id', type: 'integer' })
  roleId: number;

  @Column({ name: 'account_id', type: 'integer' })
  accountId: number;
}
