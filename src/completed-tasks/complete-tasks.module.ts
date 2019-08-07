import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { TaskSchema } from "../shared/task.model";
import { SharedModule } from "../shared/shared.module";
import { CompletedTasksService } from "./-completed-tasks.service";
import { CompletedTasksControler } from "./completed-tasks.controler";

@Module({
    imports: [MongooseModule.forFeature([{name:'Completed-Tasks', schema: TaskSchema}]), SharedModule],
    controllers: [CompletedTasksControler],
    providers:[CompletedTasksService]
})

export class TasksModule{}