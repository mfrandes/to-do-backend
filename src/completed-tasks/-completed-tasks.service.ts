import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CompletedTask } from "src/shared/completed-task.model";

@Injectable()
export class CompletedTasksService {
    private completedTasks: CompletedTask[] = [];

    constructor(@InjectModel('Completed-Task') private readonly taskModel: Model<CompletedTask>) { }

    async insertTask(taskName: string, taskDetails: string) {
        const newTask: CompletedTask = new this.taskModel({taskName: taskName, taskDetails: taskDetails });
        this.completedTasks.push(newTask);
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
                    taskDetails: task.taskDetails
                })
            }
        )
    }
    async getSingleTask(taskId){
        const task = await this.findTask(taskId);
        return {
            id: task.id,
            taskName: task.taskName,
            taskDetails: task.taskDetails
        }
    }

    async updateTask(taskId: string, taskName: string, taskDetails: string){
        const updatedTask = await this.findTask(taskId);
        if(taskName){
            updatedTask.taskName = taskName;
        }
        if(taskDetails){
            updatedTask.taskDetails = taskDetails;
        }
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