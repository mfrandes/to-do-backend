import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { TaskSchema } from "./task.model";
import { TasksControler } from "./tasks.controler";
import { TasksService } from "./tasks.service";

@Module({
    imports: [MongooseModule.forFeature([{name:'Task', schema: TaskSchema}])],
    controllers: [TasksControler],
    providers:[TasksService]
})

export class TasksModule{}