import { Injectable, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from 'src/auth/auth.guard';

@Injectable()
export class UserService {
  private readonly users = [];
  constructor(@InjectRepository (User) private UserRepository: Repository<User>){}

  async create(createUserDto: CreateUserDto) {
    const password = createUserDto?.password
              ? await this.hashPassword(createUserDto?.password)
              : '';
    createUserDto.password = password;
    const user = this.UserRepository.create(createUserDto);
    
    return await this.UserRepository.save(user);
  }

  /**
 *
 * @param password
 * @returns
 */
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  /**
   *
   * @param password
   * @param hashedPassword
   * @returns
   */
  async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  findAll() {
    return this.UserRepository.find();
  }

  async findUser(username: string): Promise<User | undefined> {
    return this.UserRepository.findOne({where: {username : username}});
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.UserRepository.findOne({where: {id}});

    Object.assign(user, updateUserDto);

    return await this.UserRepository.save( user );
  }

  async remove(id: number) {
    const user = await this.UserRepository.findOne({where: {id}});

    return await this.UserRepository.remove( user );
  }
}
