import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType()
export class CreateTodoInput{
    @Field()
    @IsString()
    @IsNotEmpty()
    title:string;

    @Field()
    @IsString()
    @IsOptional()
    description?:string;

    @Field()
    @IsBoolean()
    @IsOptional()
    completed?:boolean;
}