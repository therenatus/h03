"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBlogDto = void 0;
const express_validator_1 = require("express-validator");
const urlPattern = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(\/\S*)?$/;
const CreateBlogDto = () => {
    return [
        (0, express_validator_1.body)('websiteUrl').isLength({ min: 1, max: 100 }).withMessage('invalid').matches(urlPattern).withMessage('dd'),
        (0, express_validator_1.body)('name').trim().isString().isLength({ min: 1, max: 15 }),
        (0, express_validator_1.body)('description').trim().isLength({ min: 1, max: 500 }),
    ];
};
exports.CreateBlogDto = CreateBlogDto;
