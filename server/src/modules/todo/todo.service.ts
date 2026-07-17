import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entities';
import { Repository } from 'typeorm';
import { CreateTodoReqDTO } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async getAllTodos(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async createTodo(
    createTodoPayload: CreateTodoReqDTO,
    userId: string,
  ): Promise<Todo> {
    const { title, description, status } = createTodoPayload;

    const todo = this.todoRepository.create({
      title,
      description,
      status,
      user: {
        id: userId,
      },
    });

    return await this.todoRepository.save(todo);
  }

  async deleteTodo(userId: string) {
    const user = await this.todoRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.todoRepository.remove(user);
  }
}
