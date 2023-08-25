import express, {Router} from "express"
import { register, signin, view } from "../controller/authController"
import { upload } from "../config/multer"

const router = express.Router()
router.route("/register").post(upload, register)
router.route("/signin").post(signin)
router.route("/view").get(view)

export default router