import { Request, Response } from "express";
import { UserModel } from "../database/models/UserModel";

class UserController {
  async findAll(req: Request, res: Response) {
    try {
      const users = await UserModel.findAll();
      return users.length > 0
        ? res.status(200).json(users)
        : res.status(204).send();
    } catch (error) {
      return res.status(500).json({ msg: "Fail to read" });
    }
  }
  async findOne(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const user = await UserModel.findOne({
        where: {
          id: userId,
        },
      });
      if (!user) {
        return res.status(404).json({ msg: "Can not find existing user" });
      }
      return res.status(200).json({ msg: "Found user", user });
    } catch (error) {
      return res.status(500).json({ msg: "Fail to read" });
    }
  }
  async create(req: Request, res: Response) {
    try {
      const { email, name, age } = req.body;
      const user = UserModel.create({
        email,
        name,
        age,
      });
      return res.status(201).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ msg: "Fail to create" });
    }
  }
  async update(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const user = await UserModel.update(req.body, { where: { id: userId } });
      if (!user) {
        return res.status(404).json({ msg: "Can not find existing user" });
      }
      return res.status(204).json({ msg: "Updated user", success: true, user });
    } catch (error) {
      return res.status(500).json({ msg: "Fail to update" });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const user = await UserModel.destroy({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ msg: "Can not find existing user" });
      }
      return res.status(204).send({ msg: "Deleted user", user });
    } catch (error) {
      return res.status(500).json({ msg: "Fail to delete" });
    }
  }
}

export default new UserController();
