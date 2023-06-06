import {IBlog} from "../types/blog.interface";
import { Request, Response} from "express";
import {blogRepository} from "../index";
import {ObjectId} from "mongodb";

export class BlogService {

  async getAll(req: Request, res: Response) {
    const [blog] = await Promise.all([blogRepository.find().project({_id: 0}).toArray()]);
    res.status(200).send(blog)
  }

  async getOne(req: Request, res: Response) {
    if(!req.params.id){
      return res.status(404).send();
    }
    const blog = await blogRepository.findOne({ id: req.params.id}, {projection: { _id: 0}});
    if(!blog) {return res.status(200).send();
    }
    res.status(200).send(blog);
  }

  async create (req: Request, res: Response){
    const date = new Date();
    const body = req.body;
    body.createdAt = date;
    body.id = (+date).toString();
    body.isMembership = false;
    const insertBlog = await blogRepository.insertOne(req.body);
    const blog = await blogRepository.findOne({_id: insertBlog.insertedId}, {projection: { _id: 0}});
    res.status(201).send(blog);
  }

  async update(req: Request, res: Response){
    if(!req.params.id){
      return res.status(404).send();
    }
    const isBlog = await blogRepository.findOne({ id: req.params.id});
    console.log(isBlog)
    if(!isBlog){
      return res.status(404).send();
    }
    await blogRepository.updateOne({ id: req.params.id}, {$set: req.body});

    res.status(204).send();
  }

  async delete (req: Request, res: Response) {
    if(!req.params.id){
      return res.status(404).send();
    }
    // const isBlog = await blogRepository.findOne({ id: req.params.id});
    // if(!isBlog){
    //   return res.status(404).send();
    // }
    const deleted = await blogRepository.deleteOne({ id: req.params.id });
    if (deleted.deletedCount === 0) {
      return res.status(404).send('Not Found');
    }
   res.status(204).send()
  }
}