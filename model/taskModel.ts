import mongoose from "mongoose";

export interface iTask {
    name?: string;
    taskAvatar?: string;
    task?: string;
    priority?: string;
    taskStatus : string
    progress : {}[];
    // done : {}[]
  }

  export interface iTaskServices extends iTask, mongoose.Document {};
const taskModel = new mongoose.Schema({
    name: {
        type: String
    },
    taskAvatar: {
        type: String
    },
    task: {
        type: String,
        ref: "auths"
    },
    priority:{
        type: String
    },
    progress : [
        {
            type: mongoose.Types.ObjectId,
            ref : "progress"
        }
    ],
    done: [
        {
            type: mongoose.Types.ObjectId, 
            ref: "dones"
        }
    ]
  
}, {timestamps: true})

export default mongoose.model<iTaskServices>("tasks", taskModel)