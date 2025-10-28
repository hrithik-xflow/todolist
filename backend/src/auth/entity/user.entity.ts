import { Field } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Generated,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Generated()
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
