import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from '../entity/todos.entity';
import { TodosService } from '../service/todos.service';
import { CreateTodoInput } from '../inputs/create-todo.input';
import { DeleteTodoInput } from '../inputs/detete-todo.input';
import { PageLoadInput } from '../inputs/page-load.input';
import { PaginatedTodo } from '../entity/PaginatedTodo.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Query(() => PaginatedTodo)
  @UseGuards(GqlAuthGuard)
  async listTodos(
    @Args('input') input: PageLoadInput,
    @Context() context,
  ): Promise<PaginatedTodo> {
    // console.log(context.req.user);
    const res = await this.todosService.findAll(context.req.user.id);
    let resQuery: Todo[] = [];

    // console.log(input);

    res.map((item) => {
      if (
        (input.query.completionStatus === 'all' ||
          (input.query.completionStatus === 'pending' && !item.completed) ||
          (input.query.completionStatus === 'completed' && item.completed)) &&
        (item.title
          .toLowerCase()
          .includes(input.query.searchKey.toLowerCase()) ||
          item.description
            .toLowerCase()
            .includes(input.query.searchKey.toLowerCase()))
      ) {
        resQuery.push(item);
      }
    });
    // console.log(resQuery);

    const totalTasks = resQuery.length;
    const pageSize = input.pageSize;
    const pageCount = Math.ceil(totalTasks / pageSize);

    const start = (input.page - 1) * pageSize;

    const tasks = resQuery.slice(start, start + pageSize);

    return {
      tasks,
      totalCount: totalTasks,
      totalPages: pageCount,
    };
  }

  @Mutation(() => Todo)
  @UseGuards(GqlAuthGuard)
  async createTodo(
    @Args('input') input: CreateTodoInput,
    @Context() context,
  ): Promise<Todo> {
    return this.todosService.create(input, context.req.user.id);
  }

  @Mutation(() => Todo)
  @UseGuards(GqlAuthGuard)
  async DeleteTodo(
    @Args('input') input: DeleteTodoInput,
    @Context() context,
  ): Promise<Todo> {
    return this.todosService.delete(input.id, context.req.user.id);
  }
}
