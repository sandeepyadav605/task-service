import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, Task, UpdateTaskDto } from './dto/task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.create(createTaskDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.update(id, updateTaskDto);
  }
  @Get('/user/:userId')
  async findAllUserTasks(@Param('userId') userId: string): Promise<Task[]> {
    return this.taskService.findAllUserTasks(userId);
  }
}
