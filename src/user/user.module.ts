import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserTask } from 'src/user-task/entities/user-task.entity';
import { Task } from 'src/tasks/entities/task.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User, UserTask, Task])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {
  
}
