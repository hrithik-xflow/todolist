import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { TodosService } from 'src/todos/service/todos.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async check(@Body() body) {
    const user = await this.authService.findOne(body.email);
    console.log(user);
    return user;
  }

  @Post('signup')
  async signup(@Body() body) {
    console.log(body);
    const user = await this.authService.add({
      email: body.email,
      password: body.password,
      name: body.name,
    });

    return user;
  }
}
