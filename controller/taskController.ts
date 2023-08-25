import { Request, Response } from "express";

import mongoose from "mongoose";

import taskModel from "../model/taskModel";
import { STATUSCODES } from "../error/notifierError";
import authModel from "../model/authModel";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { task, priority } = req.body;

    const user = await authModel.findById(id);

    const tasked = await taskModel.create({
      name: user?.name,
      task,
      priority,
      taskAvatar: user?.avatar,
    });

    res.status(STATUSCODES.CREATE).json({
      message: "task created",
      data: tasked,
    });
  } catch (error: any) {
    return res
      .status(STATUSCODES.BAD)
      .json({ message: "Error creating task", data: error.message });
  }
};

export const readTask = async (req: Request, res: Response) => {
  try {
    const tasked = await taskModel.find();

    res.status(STATUSCODES.OK).json({ message: "task", data: tasked });
  } catch (error: any) {
    res
      .status(STATUSCODES.BAD)
      .json({ message: "Error reading task", data: error.message });
  }
};

// export const updateOneTask = async (req: Request, res: Response) => {
//   try {
//     const { task, priority , taskStatus } = req.body;
//     const getTask = await TaskModel.findById(req.params.taskId)
//     if(taskStatus === false){
// return res.status(STATUSCODE.BAD).json({
//     message : "To start Task , please move to progess"
// })
//     }else{
//         const tasked = await TaskModel.findByIdAndUpdate(
//             getTask?._id,
//             { task, priority , taskStatus },
//             { new: true }
//           );

//           getTask?.progress?.push(new mongoose.Types.ObjectId(tasked?._id))
//           getTask?.save()
//           res.status(STATUSCODE.OK).json({ message: "task read", data: tasked });
//     }

//   } catch (error: any) {
//     res.status(STATUSCODE.BAD).json({ message: "Error reading task" });
//   }
// };

export const readOneTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tasked = await taskModel.findById(id);

    res
      .status(STATUSCODES.CREATE)
      .json({ message: "reading task ", data: tasked });
  } catch (error: any) {
    res
      .status(STATUSCODES.CREATE)
      .json({ message: "Error reading task", data: error.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tasked = await taskModel.findByIdAndDelete(id);

    res
      .status(STATUSCODES.CREATE)
      .json({ message: "task has been deleted", data: tasked });
  } catch (error: any) {
    res
      .status(STATUSCODES.BAD)
      .json({ message: "Error deleting task ", data: error.message });
  }
};
