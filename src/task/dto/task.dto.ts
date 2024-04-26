import { Document } from 'mongoose';

export interface Task extends Document {
  title: string;
  description: string;
  assignedTo: string;
  assignedDetails: any;
  createdAt?: Date;
  updatedAt?: Date;
  status?: TaskStatus;
  startDate?: Date;
  endDate?: Date;
}
export enum TaskStatus {
  Open = 'Open',
  Completed = 'Completed',
  InProgress = 'In Progress',
}

export interface CreateTaskDto extends Document {
  title: string;
  description: string;
  assignedTo: string;
  startDate?: Date;
  endDate?: Date;
}

export interface UpdateTaskDto extends Document {
  title?: string;
  description?: string;
  status?: TaskStatus;
  startDate?: Date;
  endDate?: Date;
}
