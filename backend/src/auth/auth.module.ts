import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { TodosService } from 'src/todos/service/todos.service';
import { TodosModule } from 'src/todos/module/todos.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.NODE_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    TodosModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
