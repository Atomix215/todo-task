import { User } from 'src/modules/auth/entities/user.entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    enum: ['PENDING', 'COMPLETED'],
    default: 'PENDING',
  })
  status: 'PENDING' | 'COMPLETED';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;
}
