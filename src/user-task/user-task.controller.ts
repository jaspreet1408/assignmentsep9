import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserTaskService } from './user-task.service';
import { CreateUserTaskDto } from './dto/create-user-task.dto';
import { UpdateUserTaskDto } from './dto/update-user-task.dto';

@Controller('user-task')
export class UserTaskController {
  constructor(private readonly userTaskService: UserTaskService) {}

  @Post('assign-task')
  create(@Body() createUserTaskDto: CreateUserTaskDto) {
    return this.userTaskService.create(createUserTaskDto);
  }

  @Get('get-all')
  findAll() {
    return this.userTaskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userTaskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserTaskDto: UpdateUserTaskDto) {
    return this.userTaskService.update(+id, updateUserTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userTaskService.remove(+id);
  }
}
