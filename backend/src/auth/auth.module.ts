import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { TodosService } from 'src/todos/service/todos.service';
import { TodosModule } from 'src/todos/module/todos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.NODE_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
