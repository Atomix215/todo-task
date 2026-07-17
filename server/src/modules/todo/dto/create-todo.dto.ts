import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TODO_STATUS, type TodoStatusType } from '../enum/todo.enum';

export class CreateTodoReqDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(TODO_STATUS)
  @IsOptional()
  status?: TodoStatusType;
}
