import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from '../entity/todos.entity';
import { TodosService } from '../service/todos.service';
import { TodosController } from '../controller/todos.controller';
import { TodosResolver } from '../resolver/todos.resolver';

@Module({
    imports:[TypeOrmModule.forFeature([Todo])],
    controllers:[TodosController],
    providers:[TodosService, TodosResolver],
    exports:[TodosService]
})
export class TodosModule {}
