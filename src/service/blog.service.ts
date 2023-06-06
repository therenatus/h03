import {IBlog} from "../types/blog.interface";
import { Request, Response} from "express";
import {blogRepository} from "../index";
import {ObjectId} from "mongodb";

export class BlogService {

  async getAll(req: Request, res: Response) {
    const [blog] = await Promise.all([blogRepository.find().toArray()]);
    res.status(200).send(blog)
  }

  async getOne(req: Request, res: Response) {
    if(!req.params.id){
      return res.status(200).send();
    }
    const blog = await blogRepository.findOne({ id: req.params.id});
    console.log(blog)
    if(!blog) {
      return res.status(404).send('Not Found');
    }
    res.status(200).send(blog);
  }

  async create (req: Request, res: Response){
    const date = new Date();
    const body = req.body;
    body.createdAt = date;
    body.isMembership = false;
    body.id = date.toISOString()
    const insertBlog = await blogRepository.insertOne(req.body);
    const blog = await blogRepository.findOne({_id: insertBlog.insertedId});
    res.status(201).send(blog);
  }

  async update(req: Request, res: Response){
    const blog = await blogRepository.updateOne({ id: req.params.id}, req.body);
    if(blog.matchedCount === 0){
      return res.status(404).send('Not Found');
    }
    res.status(204).send();
  }

  async delete (req: Request, res: Response) {
    const deleted = await blogRepository.deleteOne({ id: req.params.id });
    if (!deleted.deletedCount) {
      return  res.status(404).send('Not Found');
    }
   res.send(204).send()
  }
}