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
exports.BlogService = void 0;
const index_1 = require("../index");
const mongodb_1 = require("mongodb");
class BlogService {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield index_1.blogRepository.find().toArray();
            res.status(200).send(blog);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.id);
            const blog = yield index_1.blogRepository.findOne({ _id: new mongodb_1.ObjectId(req.params.id) });
            console.log(blog);
            if (!blog) {
                return res.status(404).send('Not Found');
            }
            res.status(200).send(blog);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield index_1.blogRepository.insertOne(req.body);
            res.status(201).send(blog);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield index_1.blogRepository.updateOne({ __id: new mongodb_1.ObjectId(req.params.id) }, req.body);
            if (blog.matchedCount === 0) {
                return res.status(404).send('Not Found');
            }
            res.status(204).send();
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield index_1.blogRepository.deleteOne({ _id: new mongodb_1.ObjectId(req.params.id) });
            if (!deleted.deletedCount) {
                return res.status(404).send('Not Found');
            }
            res.send(204).send();
        });
    }
}
exports.BlogService = BlogService;
