import { Request, Response } from "express";
import { UserService } from "../services/UsersService";


export class UsersController {

  async create(req: Request, res: Response): Promise <Response>{
    const { email } = req.body;

    const usersService = new UserService()

    const user = await usersService.create(email);

    return res.json(user);
  }
}