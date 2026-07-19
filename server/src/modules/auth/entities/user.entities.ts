import { Exclude } from 'class-transformer';
import { Todo } from 'src/modules/todo/entities/todo.entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
