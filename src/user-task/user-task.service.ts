import { Injectable } from '@nestjs/common';
import { CreateUserTaskDto } from './dto/create-user-task.dto';
import { UpdateUserTaskDto } from './dto/update-user-task.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTask } from './entities/user-task.entity';
import { User } from 'src/user/entities/user.entity';
import { Task } from 'src/tasks/entities/task.entity';

@Injectable()
export class UserTaskService {
  constructor(
    @InjectRepository (UserTask) private UserTaskRepository: Repository<UserTask>,

    @InjectRepository (User) private UserRepository: Repository<User>,

    @InjectRepository (Task) private TaskRepository: Repository<Task>
  
  ){}

  async create(createUserTaskDto: CreateUserTaskDto) {
    const task = this.UserTaskRepository.create(createUserTaskDto);
    
    const userexists = await this.UserRepository.findOne({where: {id: task['user_id']}});
    const taskexists = await this.TaskRepository.findOne({where: {id: task['task_id']}});
    
    if(userexists && taskexists){
      return await this.UserTaskRepository.save(task);
    } else {
      return 'Something went wrong';
    } 
    
  }

  findAll() {
    return this.UserTaskRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} userTask`;
  }

  update(id: number, updateUserTaskDto: UpdateUserTaskDto) {
    return `This action updates a #${id} userTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} userTask`;
  }
}
