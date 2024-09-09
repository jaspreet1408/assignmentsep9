import { Module } from '@nestjs/common';
import { UserTaskService } from './user-task.service';
import { UserTaskController } from './user-task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTask } from './entities/user-task.entity';
import { User } from 'src/user/entities/user.entity';
import { Task } from 'src/tasks/entities/task.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserTask, User, Task])],
  controllers: [UserTaskController],
  providers: [UserTaskService],
})
export class UserTaskModule {}
