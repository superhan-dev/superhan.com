import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity('withdrawal_account')
export class WithdrawalAccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AccountEntity)
  @JoinColumn({ name: 'account_id' })
  user: AccountEntity;

  @CreateDateColumn({
    name: 'withdrawal_date',
    type: 'timestamp',
  })
  withdrawalDate: Date;

  @UpdateDateColumn({
    name: 'update_date',
    type: 'timestamp',
  })
  updateDate: Date;
}
