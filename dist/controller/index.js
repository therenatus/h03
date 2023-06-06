"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_controller_1 = __importDefault(require("./blog.controller"));
const post_controller_1 = __importDefault(require("./post.controller"));
const blog_controller_spec_1 = __importDefault(require("./blog.controller.spec"));
const router = express_1.default.Router();
router.use('/blogs', blog_controller_1.default);
router.use('/posts', post_controller_1.default);
router.use('/testing', blog_controller_spec_1.default);
exports.default = router;
