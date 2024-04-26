import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTaskDto, Task, UpdateTaskDto } from './dto/task.dto';
import axios, { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<Task>,
    private httpService: HttpService,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    try {
      // Fetch task details
      const task = await this.taskModel.findById(id).exec();
      // If task is found, fetch user details and embed them in the response
      if (task) {
        const userDetails = await this.getUserDetails(task.assignedTo);
        task.assignedDetails = userDetails;
      }
      return task; // Task not found
    } catch (error) {
      console.error('Error finding task with user details:', error);
      throw error;
    }
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<void> {
    await this.taskModel.findByIdAndDelete(id).exec();
  }

  async findAllUserTasks(userId) {
    try {
      const userTasks = await this.taskModel.find({ assignedTo: userId });
      return userTasks;
    } catch (error) {
      console.error('Error finding user tasks:', error);
    }
  }

  // getUserDetails(userId: string): Observable<AxiosResponse<any>> {
  //   const response = this.httpService.get(
  //     'http://localhost:3000/user/1'
  //   );
  //   console.log(`response:${JSON.stringify(response)}`);
  //   return response;
  // }

  async getUserDetails(userId: string): Promise<Observable<AxiosResponse<any, any>>> {
    try {
      const response = await axios.get(
        'http://user-service-user-service-backend:3000/user/1',
      );
      console.log(`response:${JSON.stringify(response)}`);
      return response.data;
    } catch (error) {
      console.error('Error getting user details:', error);
      throw error;
    }
  }
}
