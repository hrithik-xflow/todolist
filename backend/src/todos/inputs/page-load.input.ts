import { Field, InputType } from '@nestjs/graphql';
import {
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  isString,
  IsString,
} from 'class-validator';

@InputType()
export class QueryInput {
  @Field()
  @IsString()
  searchKey: string;

  @Field()
  @IsString()
  completionStatus: string;
}

@InputType()
export class PageLoadInput {
  @Field()
  @IsNotEmpty()
  @IsNumber()
  page: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  pageSize: number;

  @Field(() => QueryInput)
  query: {
    searchKey: string;
    completionStatus: string;
  };
}
