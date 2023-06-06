import express from "express";
import {BlogService} from '../service/blog.service'
import {CreateBlogDto} from "./dto/create-blog.dto";
import {InputValidationMiddleware} from "../middleware/inputValidationMiddleware";
import {AuthMiddleware} from "../middleware/auth.middleware";

const router = express.Router();
const service = new BlogService();

router.get('/', service.getAll );
router.post('/',CreateBlogDto(), InputValidationMiddleware, service.create);
router.get('/:id', service.getOne);
router.put('/:id',CreateBlogDto(), InputValidationMiddleware, service.update);
router.delete('/:id',AuthMiddleware, service.delete);


export default router;