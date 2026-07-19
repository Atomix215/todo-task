import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entities';
import { CreateTodoReqDTO } from './dto/create-todo.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { type Request } from 'express';
import { UpdateTodoReqDTO } from './dto/update-todo.dto';
import { GetAllTodoQueryDTO, GetAllTodoResDTO } from './dto/get-todo.dto';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAllTodos(
    @Query() getAllTodoQuery: GetAllTodoQueryDTO,
  ): Promise<GetAllTodoResDTO> {
    return this.todoService.getAllTodos(getAllTodoQuery);
  }

  @Get(':id')
  async getOneTodo(@Param('id') todoId: string) {
    return this.todoService.getOneTodo(todoId);
  }

  @Post()
  async createTodo(
    @Body() createTodoPayload: CreateTodoReqDTO,
    @Req() req: Request,
  ) {
    const { id: userId } = req.user as { id: string };

    return this.todoService.createTodo(createTodoPayload, userId);
  }

  @Put(':id')
  async updateTodo(
    @Param('id') todoId: string,
    @Body() updateTodoPayload: UpdateTodoReqDTO,
  ): Promise<any> {
    return this.todoService.updateTodo(todoId, updateTodoPayload);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') todoId: string) {
    return this.todoService.deleteTodo(todoId);
  }
}
