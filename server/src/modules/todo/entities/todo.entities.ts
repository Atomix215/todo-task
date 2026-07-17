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
import { TODO_STATUS, type TodoStatusType } from '../enum/todo.enum';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: Object.values(TODO_STATUS),
    default: TODO_STATUS.PENDING,
  })
  status: TodoStatusType;

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
