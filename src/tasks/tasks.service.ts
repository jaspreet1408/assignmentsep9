import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(@InjectRepository (Task) private TaskRepository: Repository<Task>){}

  
  async create(createTaskDto: CreateTaskDto) {
    const task = this.TaskRepository.create(createTaskDto);
    return await this.TaskRepository.save(task);
  }

  findAll() {
    return this.TaskRepository.find();
  }

  findOne(id: number) {
    return this.TaskRepository.findOne({where: {id}});
  }

  async update(id: number, updateUserDto: UpdateTaskDto) {
    const task = await this.TaskRepository.findOne({where: {id}});

    Object.assign(task, updateUserDto);

    return await this.TaskRepository.save( task );
  }

  async remove(id: number) {
    const user = await this.TaskRepository.findOne({where: {id}});

    return await this.TaskRepository.remove( user );
  }
}
