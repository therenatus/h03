import {IPost} from "../types/post.interface";
import { Request, Response} from "express";
import {blogRepository, postRepository} from "../index";
import {ObjectId} from "mongodb";

export class PostService {

  async getAll(req: Request, res: Response) {
    const [post] = await Promise.all([postRepository.find().toArray()]);
    res.status(200).send(post)
  }

  async getOne(req: Request, res: Response) {
    const post = await postRepository.findOne({ id: req.params.id});
    if(!post) {
      return res.status(404).send('Not Found');
    }
    res.status(200).send(post);
  }

  async create (req: Request, res: Response): Promise<Response<IPost>> {
    const postBody = req.body;
    const blog = await blogRepository.findOne({id: req.body.blogId});
    if(!blog){
      return res.status(404).send()
    }
    const unique = await postRepository.findOne({ blogId: blog.id});
    if(unique) {
      return res.status(401).send()
    }
    postBody.blogName = blog?.name;
    const post = await postRepository.insertOne(postBody);
    const posted = await postRepository.findOne({_id: post.insertedId})
    return res.status(201).send(posted);
  }

  async update(req: Request, res: Response){
    const post = await postRepository.updateOne({ id: req.params.id}, req.body);
    if(post.matchedCount === 0){
      return res.status(404).send('Not Found');
    }
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