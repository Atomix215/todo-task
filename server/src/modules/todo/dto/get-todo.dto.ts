import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Todo } from '../entities/todo.entities';
import { Type } from 'class-transformer';
import { TODO_STATUS, type TodoStatusType } from '../enum/todo.enum';

export class GetAllTodoQueryDTO {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(TODO_STATUS)
  status?: TodoStatusType;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 10;
}

export class GetAllTodoResDTO {
  @IsNotEmpty()
  data: Todo[];

  @IsObject()
  @IsNotEmptyObject()
  meta: {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
  };
}
