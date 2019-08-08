import * as mongoose from "mongoose";

export const CompletedTaskSchema = new mongoose.Schema({
    taskName: {type: String, required: true},
    taskDetails: {type: String, required: true}
})

export interface CompletedTask extends mongoose.Document {
    id: string;
    taskName: string;
    taskDetails: string;

}