import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  //   @Get()
  //   getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
  //     //If we have any filters defined, call tasksService.getTaskWiFilFilters
  //     //otherwise , jusrgetall tasks
  //     if (Object.keys(filterDto).length) {
  //       //...
  //       return this.tasksService.getTasksWithFilters(filterDto);
  //     } else {
  //       return this.tasksService.getAllTasks();
  //     }
  //   }

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  //   // @Post()
  //   // createTask(@Body() body) {
  //   //   console.log('body', body);
  //   // }
  //   //http://localhost:3000/task/j123v76476
  //   @Get('/:id')
  //   getTaskById(@Param('id') id: string): Task {
  //     return this.tasksService.getTaskById(id);
  //   }
  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }
  //   @Delete('/:id')
  //   deleteTask(@Param('id') id: string): void {
  //     return this.tasksService.deleteTask(id);
  //   }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  //   @Post()
  //   createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //     return this.tasksService.createTask(createTaskDto);
  //   }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  //   @Patch('/:id/status')
  //   updateTaskStatus(
  //     @Param('id') id: string,
  //     @Body() updateTaskstatusDto: UpdateTaskStatusDto,
  //   ): Task {
  //     const { status } = updateTaskstatusDto;
  //     return this.tasksService.updateTaskStatus(id, status);
  //   }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskstatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskstatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }
}
