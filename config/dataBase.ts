import mongoose from "mongoose";
import env from "dotenv";
env.config()

const MongoString: string = process.env.APPLICATION_STRING!

export const dataBase = () => {
    mongoose.connect(MongoString).then(() => {
        console.log("Our database is databasing")
    })
}