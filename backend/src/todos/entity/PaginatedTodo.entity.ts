import { Field, ObjectType } from "@nestjs/graphql";
import { Todo } from "./todos.entity";

@ObjectType()
export class PaginatedTodo{
    @Field(()=>[Todo])
    tasks:Todo[];

    @Field()
    totalCount:number;

    @Field()
    totalPages:number;
}