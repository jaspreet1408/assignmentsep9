import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserTaskService } from './user-task.service';
import { CreateUserTaskDto } from './dto/create-user-task.dto';
import { UpdateUserTaskDto } from './dto/update-user-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user-task')
export class UserTaskController {
  constructor(private readonly userTaskService: UserTaskService) {}

  @UseGuards(AuthGuard)
  @Post('assign-task')
  create(@Body() createUserTaskDto: CreateUserTaskDto) {
    return this.userTaskService.create(createUserTaskDto);
  }

  @UseGuards(AuthGuard)
  @Get('get-all')
  findAll() {
    return this.userTaskService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userTaskService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserTaskDto: UpdateUserTaskDto) {
    return this.userTaskService.update(+id, updateUserTaskDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userTaskService.remove(+id);
  }
}
