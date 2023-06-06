import {IPost} from "../types/post.interface";
import { Request, Response} from "express";
import {blogRepository, postRepository} from "../index";
import {ObjectId} from "mongodb";

export class PostService {

  async getAll(req: Request, res: Response) {
    const [post] = await Promise.all([postRepository.find().project({_id: 0}).toArray()]);
    res.status(200).send(post)
  }

  async getOne(req: Request, res: Response) {
    if(!req.params.id){
      return res.status(200).send();
    }
    const post = await postRepository.findOne({ id: req.params.id}, {projection: { _id: 0}});
    if(!post) {
      return res.status(404).send('Not Found');
    }
    res.status(200).send(post);
  }

  async create (req: Request, res: Response): Promise<Response<IPost>> {
    const postBody = req.body;
    const date = new Date();
    const blog = await blogRepository.findOne({id: req.body.blogId}, {projection: { _id: 0}});
    if(!blog){
      return res.status(404).send()
    }
    const unique = await postRepository.findOne({ blogId: blog.id});
    if(unique) {
      return res.status(400).send()
    }
    postBody.blogName = blog?.name;
    postBody.createdAt = date;
    postBody.id = (+date).toString();
    const post = await postRepository.insertOne(postBody);
    const posted = await postRepository.findOne({_id: post.insertedId}, {projection: { _id: 0}})
    console.log(posted)
    return res.status(201).send(posted);
  }

  async update(req: Request, res: Response){
    const isBlog = await blogRepository.findOne({ id: req.params.id});
    if(!isBlog){
      return res.status(204).send();
    }
    await postRepository.updateOne({ id: req.params.id}, req.body);
    res.status(204).send();
  }

  async delete (req: Request, res: Response) {
    const deleted = await postRepository.deleteOne({id: req.params.id});
    if (deleted.deletedCount === 0) {
      return  res.status(404).send('Not Found');
    }
    res.send(204).send()
  }
}