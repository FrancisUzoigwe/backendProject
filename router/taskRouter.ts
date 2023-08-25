import express, {Router} from "express"
import { createTask, deleteTask, readOneTask, readTask } from "../controller/taskController"


const router: Router = express()
router.route("/:id/create-task").post(createTask)
router.route("/read-task").get(readTask)
router.route("/:id/read-one-task").get(readOneTask)
router.route("/:id/delete-task").delete(deleteTask)

export default router
