"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const index_1 = require("../index");
const mongodb_1 = require("mongodb");
class PostService {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield index_1.postRepository.find().toArray();
            res.status(200).send(post);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield index_1.postRepository.findOne({ _id: new mongodb_1.ObjectId(req.params.id) });
            if (!post) {
                return res.status(404).send('Not Found');
            }
            res.status(200).send(post);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = req.body;
            const blog = yield index_1.blogRepository.findOne({ _id: new mongodb_1.ObjectId(req.body.blogId) });
            if (!blog) {
                return res.status(404).send();
            }
            const unique = yield index_1.postRepository.findOne({ blogId: blog._id });
            if (unique) {
                return res.status(401).send();
            }
            post.blogName = blog === null || blog === void 0 ? void 0 : blog.name;
            const posted = yield index_1.postRepository.insertOne(post);
            return res.status(201).send(posted);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield index_1.postRepository.updateOne({ _id: new mongodb_1.ObjectId(req.params.id) }, req.body);
            if (post.matchedCount === 0) {
                return res.status(404).send('Not Found');
            }
            res.status(204).send();
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield index_1.postRepository.deleteOne({ _id: new mongodb_1.ObjectId(req.params.id) });
            if (deleted.deletedCount === 0) {
                return res.status(404).send('Not Found');
            }
            res.send(204).send();
        });
    }
}
exports.PostService = PostService;
