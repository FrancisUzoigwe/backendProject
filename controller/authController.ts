import express, { Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import bcrypt from "bcrypt";
import authModel from "../model/authModel";
import { STATUSCODES, notifierError } from "../error/notifierError";

export const register = async (req: any, res: Response) => {
  try {
    const { firstName, lastName, email, address, password } = req.body;
    const salt: any = await bcrypt.genSalt(10);
    const hashed: any = await bcrypt.hash(password, salt);
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file?.path
    );
    const user = await authModel.create({
      firstName,
      lastName,
      email,
      address,
      password: hashed,
      avatar: secure_url,
      avatarID: public_id,
    });
    return res.status(201).json({
      message: " User registered successfully",
      data: user,
    });
  } catch (error: any) {
    new notifierError({
      errorName: "User registration error",
      errorMessage: "User registration error occurred",
      errorStatus: STATUSCODES.BAD,
      errorSuccess: false,
    });
    return res.status(STATUSCODES.BAD).json({
      message: "Error occurred while registering user",
      data: error.message,
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authModel.findOne({ email });

    if (user) {
      const check = await bcrypt.compare(password, user.password!);
      if (check) {
        return res.status(201).json({
          message: `welcome back ${user.name} registered successfully`,
          data: user.id,
        });
      } else {
        return res.status(404).json({
          message: " please SignUp",
          data: user,
        });
      }
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error occurred while registering user",
    });
  }
};

export const view = async (req: Request, res: Response) => {
  try {
    const users = await authModel.find();
    return res.status(STATUSCODES.OK).json({
      message: "Viewing all registered users",
      data: users,
    });
  } catch (error) {
    return res.status(STATUSCODES.BAD).json({
      message: "Unable to view users",
    });
  }
};
