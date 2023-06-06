"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_service_1 = require("../service/post.service");
const create_post_dto_1 = require("./dto/create-post.dto");
const inputValidationMiddleware_1 = require("../middleware/inputValidationMiddleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
const service = new post_service_1.PostService();
router.get('/', service.getAll);
router.post('/', (0, create_post_dto_1.CreatePostDto)(), inputValidationMiddleware_1.InputValidationMiddleware, service.create);
router.get('/:id', service.getOne);
router.put('/:id', (0, create_post_dto_1.CreatePostDto)(), inputValidationMiddleware_1.InputValidationMiddleware, service.update);
router.delete('/:id', auth_middleware_1.AuthMiddleware, service.delete);
exports.default = router;
