import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { SharedModule } from "../shared/shared.module";
import { CompletedTasksService } from "./-completed-tasks.service";
import { CompletedTasksControler } from "./completed-tasks.controler";
import { CompletedTaskSchema } from "src/shared/completed-task.model";

@Module({
    imports: [MongooseModule.forFeature([{name:'Completed-Tasks', schema: CompletedTaskSchema}]), SharedModule],
    controllers: [CompletedTasksControler],
    providers:[CompletedTasksService]
})

export class TasksModule{}