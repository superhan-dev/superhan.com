import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_project_role')
export class UserProjectRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'role_id', type: 'integer' })
  roleId: number;
  @Column({ name: 'project_id', type: 'integer' })
  projectId: number;
  @Column({ name: 'user_id', type: 'integer' })
  userId: number;
}
