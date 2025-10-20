import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from '../entity/todos.entity';
import { TodosService } from '../service/todos.service';
import { CreateTodoInput } from '../inputs/create-todo.input';
import { DeleteTodoInput } from '../inputs/detete-todo.input';

@Resolver(()=>Todo)
export class TodosResolver {
    constructor(
        private readonly todosService:TodosService
    ){}

    @Query(()=>[Todo])
    async listTodos():Promise<Todo[]>{
        const res = this.todosService.findAll();
        const tasks = await res;
        console.log(tasks);
        return tasks;
    }

    @Mutation(()=>Todo)
    async createTodo(@Args('input') input:CreateTodoInput):Promise<Todo>{
        return this.todosService.create(input);

    }

    @Mutation(()=>Todo)
        async DeleteTodo(@Args('input') input:DeleteTodoInput):Promise<Todo>{
            return this.todosService.delete(input.id);
        }
    
}
