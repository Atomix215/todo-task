import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entities';
import { CreateTodoReqDTO } from './dto/create-todo.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { type Request } from 'express';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAllTodos(@Req() req: Request): Promise<Todo[]> {
    return this.todoService.getAllTodos();
  }

  @Post()
  async createTodo(
    @Body() createTodoPayload: CreateTodoReqDTO,
    @Req() req: Request,
  ) {
    const { id: userId } = req.user as { id: string };

    return this.todoService.createTodo(createTodoPayload, userId);
  }

  @Delete(':id')
  async deleteTodo(@Param() userId: string) {
    return this.todoService.deleteTodo(userId);
  }
}
