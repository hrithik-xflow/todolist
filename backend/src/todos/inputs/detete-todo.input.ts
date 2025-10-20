import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber } from "class-validator";

@InputType()
export class DeleteTodoInput{
    @Field()
    @IsNotEmpty()
    @IsNumber()
    id:number

}