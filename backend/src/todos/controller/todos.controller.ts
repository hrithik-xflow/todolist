import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from '../service/todos.service';
import { Todo } from '../entity/todos.entity';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get(':id')
  async findOne(@Param('id') id: number, @Req() req): Promise<Todo> {
    // console.log(req);
    return await this.todosService.findOne(id, req.user.userId);
    // if (!todo) {
    //   throw new NotFoundException(`The Todo with ID ${id} was not found`);
    // } else return todo;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UpdateTodoDto,
    @Req() req,
  ): Promise<Todo> {
    return await this.todosService.update(id, body, req.user.userId);
  }
}
