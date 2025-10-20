import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Todo } from '../entity/todos.entity';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository:Repository<Todo>,
    ){}

    async findAll():Promise<Todo[]>{
        return this.todoRepository.find();
    }

    async findOne(id:number):Promise<Todo>{
        const todo= await this.todoRepository.findOne({where:{id}});
        
        if(!todo){
            throw new NotFoundException(`Todo with ID ${id} was not found`);
        }
        return todo;

    }


    async create(createTodoDto: CreateTodoDto):Promise<Todo>{
        const todo = this.todoRepository.create(createTodoDto);
        return this.todoRepository.save(todo);
    }

    async update(id:number, updateTodoDto:UpdateTodoDto):Promise<Todo>{
        const todo = await this.findOne(id);
        Object.assign(todo,updateTodoDto);
        return this.todoRepository.save(todo);
    }

    async delete(id:number):Promise<Todo>{
        const todo = await this.todoRepository.findOne({where:{id}})
        if(!todo){
            throw new NotFoundException(`Todo with ID ${id} was not found.`);
        }
        await this.todoRepository.delete(id);
        return todo;
        
    }
}
