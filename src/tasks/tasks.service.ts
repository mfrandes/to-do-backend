import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Task } from "../shared/task.model";

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) { }

    async insertTask(taskName: string, taskDetails: string, isCompleted: boolean) {
        const newTask: Task = new this.taskModel({taskName: taskName, taskDetails: taskDetails, isCompleted });
        this.tasks.push(newTask);
        const result = await newTask.save();
        return result.id as string;
    }

    async getTasks(){
        const tasks = await this.taskModel.find().exec();
        return tasks.map(
            task => {
                return ({
                    id: task.id, 
                    taskName: task.taskName,
                    taskDetails: task.taskDetails,
                    isCompleted: task.isCompleted
                })
            }
        )
    }
    async getSingleTask(taskId){
        const task = await this.findTask(taskId);
        return {
            id: task.id,
            taskName: task.taskName,
            taskDetails: task.taskDetails,
            isCompleted: task.isCompleted
        }
    }

    async updateTask(taskId: string, taskName: string, taskDetails: string, isCompleted:  boolean){
        const updatedTask = await this.findTask(taskId);
        if(taskName){
            updatedTask.taskName = taskName;
        }
        if(taskDetails){
            updatedTask.taskDetails = taskDetails;
        }
        updatedTask.isCompleted = isCompleted;
        updatedTask.save();
        console.log('Task '+ taskId + ' was updated');
    }

    async deleteTask(id) {
        const result = await this.taskModel.deleteOne({_id:id}).exec();
        console.log(result);
        if(result.n === 0){
            throw new NotFoundException('Could not find metioned task');
        }
        
    }

    private async findTask(id){
        let task
        try {
            task = await this.taskModel.findById(id);
        } catch (error) {
            throw new NotFoundException('Could not find task')
        }
        return task;
    }
}