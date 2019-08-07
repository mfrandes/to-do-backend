import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { TaskSchema } from "../shared/task.model";
import { TasksControler } from "./tasks.controler";
import { TasksService } from "./tasks.service";
import { SharedModule } from "../shared/shared.module";

@Module({
    imports: [MongooseModule.forFeature([{name:'Task', schema: TaskSchema}]), SharedModule],
    controllers: [TasksControler],
    providers:[TasksService]
})

export class TasksModule{}