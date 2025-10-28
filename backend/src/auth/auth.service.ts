import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(`User with email: ${email} was not found`);
    }

    return user;
  }

  async add(input: CreateUserDto) {
    const user = await this.userRepository.save(input);
    return user;
  }

  async validate(email: string, password: string) {
    const user = await this.findOne(email);
    if (!user) {
      throw new NotFoundException(`User with email: ${email} was not found`);
    }

    if (user.password != password) {
      throw new Error(`Incorrect Password`);
    }

    return user;
  }
}
