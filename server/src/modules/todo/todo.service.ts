import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entities';
import { Repository } from 'typeorm';
import { CreateTodoReqDTO } from './dto/create-todo.dto';
import { UpdateTodoReqDTO } from './dto/update-todo.dto';
import { GetAllTodoQueryDTO, GetAllTodoResDTO } from './dto/get-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async getAllTodos(
    getAllTodoQuery: GetAllTodoQueryDTO,
  ): Promise<GetAllTodoResDTO> {
    const { search, status, limit, page } = getAllTodoQuery;

    const query = this.todoRepository.createQueryBuilder('todo');

    if (search) {
      query.andWhere(
        '(todo.title ILIKE :search OR todo.description ILIKE :search)',
        {
          search: `%${search}%`,
        },
      );
    }

    if (status) {
      query.andWhere('todo.status = :status', {
        status,
      });
    }

    const skip = (page - 1) * limit;

    query.skip(skip).take(limit);

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      meta: {
        totalItems: total,
        itemsPerPage: limit,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getOneTodo(todoId: string): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: {
        id: todoId,
      },
    });

    if (!todo) {
      throw new NotFoundException('No Todo Found');
    }

    return todo;
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

  async updateTodo(
    todoId: string,
    updateTodoPayload: UpdateTodoReqDTO,
  ): Promise<any> {
    const todo = await this.todoRepository.findOne({
      where: {
        id: todoId,
      },
    });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    const updatedTodo = this.todoRepository.merge(todo, updateTodoPayload);

    return await this.todoRepository.save(updatedTodo);
  }

  async deleteTodo(todoId: string) {
    const todo = await this.todoRepository.findOne({
      where: { id: todoId },
    });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return this.todoRepository.remove(todo);
  }
}
