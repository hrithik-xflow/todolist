import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { TodosService } from 'src/todos/service/todos.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly todosService: TodosService) {}

  @Post('login')
  async check(@Body() body) {
    console.log(body);
  }
}
