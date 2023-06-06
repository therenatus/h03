import { Request, Response } from "express";
import {blogRepository, postRepository} from "../index";

class Test {
  async deleteAll(req: Request, res: Response) {
    await blogRepository.deleteMany();
    await postRepository.deleteMany();
    res.status(204).send();

  }
}

export { Test };