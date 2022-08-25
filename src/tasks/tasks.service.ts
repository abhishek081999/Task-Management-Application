import { Injectable } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(private taskEntityRepository: TaskRepository) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskEntityRepository.findAll(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    return this.taskEntityRepository.findById(id, user);
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskEntityRepository.insert(createTaskDto, user);
  }

  async deleteTask(id: string, user: User): Promise<void> {
    return this.taskEntityRepository.deleteById(id, user);
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    return this.taskEntityRepository.updateTaskStatus(id, status, user);
  }
}

// import { Injectable, NotFoundException } from '@nestjs/common';
// import { TaskStatus } from './task-status.enum';

// import { CreateTaskDto } from './dto/create-task.dto';
// import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Task } from './task.entity';
// import { Repository } from 'typeorm';

// @Injectable()
// export class TasksService {
//   constructor(
//     @InjectRepository(Task)
//     private tasksRepository: Repository<Task>,
//   ) {}

//   // getAllTasks(): Task[] {
//   //   return this.tasks;
//   // }

//   // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
//   //   const { status, search } = filterDto;

//   //   // define temporary array to hold result

//   //   let tasks = this.getAllTasks();

//   //   // Do something with status
//   //   if (status) {
//   //     tasks = tasks.filter((task) => task.status === status);
//   //   }
//   //   // Do something with search
//   //   if (search) {
//   //     tasks = tasks.filter((task) => {
//   //       if (
//   //         task.title.toLowerCase().includes(search) ||
//   //         task.description.toLowerCase().includes(search)
//   //       ) {
//   //         return true;
//   //       }
//   //       return false;
//   //     });
//   //   }
//   //   // retun final result

//   //   return tasks;
//   // }

//  async  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
//     const query = this.createQueryBuilder('task');

//     const tasks = await query.getMany();
//     return tasks;
//   }

//   async getTaskById(id: string): Promise<Task> {
//     const found = await this.tasksRepository.findOneBy({ id });
//     if (!found) {
//       throw new NotFoundException(`task with Id "${id}" not found`);
//     }
//     return found;
//   }
//   // getTaskById(id: string): Task {
//   //   //try to get task

//   //   // if not fountthrowan error(404 not found)

//   //   //otherwise return found task

//   //   const found = this.tasks.find((task) => task.id === id);
//   //   if (!found) {
//   //     throw new NotFoundException();
//   //   }

//   //   return found;
//   // }

//   // deleteTask(id: string): void {
//   //   const found = this.getTaskById(id);
//   //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
//   // }

//   async deleteTask(id: string): Promise<void> {
//     const result = await this.tasksRepository.delete(id);
//     if (result.affected === 0) {
//       throw new NotFoundException(`Task with ID "${id} not found`);
//     }
//   }

//   async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
//     const { title, description } = createTaskDto;
//     const task = this.tasksRepository.create({
//       title,
//       description,
//       status: TaskStatus.OPEN,
//     });
//     await this.tasksRepository.save(task);
//     return task;
//   }

//   // createTask(createTaskDto: CreateTaskDto): Task {
//   //   const { title, description } = createTaskDto;
//   //   const task: Task = {
//   //     id: uuid(),
//   //     title,
//   //     description,
//   //     status: TaskStatus.OPEN,
//   //   };

//   //   this.tasks.push(task);
//   //   return task;
//   // }

//   // updateTaskStatus(id: string, status: TaskStatus) {
//   //   const task = this.getTaskById(id);
//   //   task.status = status;
//   //   return task;
//   // }

//   async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
//     const task = await this.getTaskById(id);
//     task.status = status;

//     await this.tasksRepository.save(task);
//     return task;
//   }
// }
