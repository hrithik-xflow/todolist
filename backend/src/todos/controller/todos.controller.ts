import { Body, Controller, Get, NotFoundException, Param, Put } from '@nestjs/common';
import { TodosService } from '../service/todos.service';
import { Todo } from '../entity/todos.entity';
import { UpdateTodoDto } from '../dto/update-todo.dto';

@Controller('todos')
export class TodosController {
    constructor(
        private readonly todosService:TodosService
    ){}

    @Get(':id')
    async findOne(@Param('id') id:number):Promise<Todo>{
        const todo = this.todosService.findOne(id);
        if(!todo){
            throw new NotFoundException(`The Todo with ID ${id} was not found`);
        }
        return todo;
    }

    @Put(':id')
    async update(@Param('id') id:number, @Body() body:UpdateTodoDto):Promise<Todo>{
        return this.todosService.update(id,body);
    }
}
