import {body} from "express-validator";
import {blogRepository} from "../../index";
import {ObjectId} from "mongodb";

export const CreatePostDto = () => {
  return [
    body('title').trim().isString().isLength({min: 1, max: 15}),
    body('shortDescription').trim().isLength({min: 1, max: 100}),
    body('content').trim().isLength({min: 1, max: 1000}),
    body('blogId').trim().isString().custom(async(blogId) => {
      const blog = await blogRepository.findOne({_id: new ObjectId(blogId)});
      console.log(blog)
      if(!blog) {
        throw new Error('BlogID not found');
      }
      return true;
    })
  ];
}