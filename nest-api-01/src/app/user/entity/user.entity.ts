import { IsEmail } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User{
  //extends BaseEntity
  // @PrimaryGeneratedColumn("uuid")
  // public id!: string;

  // @Column({type: "varchar", length:255, select: true, unique: true})
  // public name!: string;

  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255, select: true })
  name: string;
  @Column({ type: 'varchar', length: 255, select: true, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  role: string;

  @Column({ nullable: true })
  apiKey: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    select: true,
  })
  createdAt: Date;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    select: true,
  })
  updatedAt: Date;
}
