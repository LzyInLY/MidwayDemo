import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm';
import { EntityModel } from '@midwayjs/orm';

export interface IUser {
  id?: number;
  name: string;
}

@EntityModel('user')
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: number;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: number;
}
