import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";

import { TasksService } from "./tasks.service";

@Controller('task-actions')
export class TasksControler {
    constructor(private readonly tasksService: TasksService){}
    
    @Post()
    async addTask(
        @Body('taskName') taskName: string,
        @Body('taskDetails') taskDetail: string
    ){
        const generatedId = await this.tasksService.insertTask(taskName, taskDetail);
        return {id: generatedId};
    }

    @Get()
     async getAllTasks(){
         const tasks = await this.tasksService.getTasks();
         return tasks;
    }
    
    @Get(':id')
    getTask(@Param('id') taskId: string){
        return this.tasksService.getSingleTask(taskId);
    }

    @Patch(':id')
    async updateTask(
        @Param('id') taskId: string,
        @Body('taskName') taskName: string,
        @Body('taskDetails') taskDetails: string
    ){
        await this.tasksService.updateTask(taskId, taskName, taskDetails);
        return 'Task '+ taskId + ' was updated';
    }
    @Delete(':id')
    async deleteTask(@Param('id') taskId: string){
        await this.tasksService.deleteTask(taskId);
        return "task with id: " + taskId + " was remooved"
    }
}