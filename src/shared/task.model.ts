import * as mongoose from "mongoose";

export const TaskSchema = new mongoose.Schema({
    taskName: {type: String, required: true},
    taskDetails: {type: String, required: true}
})

export interface Task extends mongoose.Document {
    id: string;
    taskName: string;
    taskDetails: string;

}