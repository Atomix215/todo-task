import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoReqDTO } from './create-todo.dto';

export class UpdateTodoReqDTO extends PartialType(CreateTodoReqDTO) {}
