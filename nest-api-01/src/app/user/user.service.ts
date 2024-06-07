import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/user.dto';
import { CreateUserResponseDto } from './dto/user.response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    const { name, email, password } = createUserDto;

    // Check if the email already exists
    const isEmailExist = await this.userRepository.findOne({
      where: { email },
    });
    if (isEmailExist) {
      throw new ConflictException(`Email already exists: ${email}`);
    }

    const user = this.userRepository.create({ name, email, password });
    const savedUser = await this.userRepository.save(user);
    return {
      message: 'User created successfully',
      id: savedUser.id.toString(),
      email: savedUser.email,
      name: savedUser.name,
    };
  }

  async findAllUsers(): Promise<{ message: string; users: User[] }> {
    const users = await this.userRepository.find();
    return {
      message: 'All users retrieved successfully',
      users,
    };
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }
  async viewUser(id: number): Promise<{ message: string; user: User }> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return {
      message: 'User retrieved successfully',
      user,
    };
  }

  async removeUser(
    id: number,
  ): Promise<{ message: string; affected?: number }> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return {
      message: 'User removed successfully',
      affected: result.affected,
    };
  }
}
