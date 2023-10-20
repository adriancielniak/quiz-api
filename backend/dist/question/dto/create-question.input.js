"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkQuestionInput = exports.CreateQuestionInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const create_answer_input_1 = require("../../answer/dto/create-answer.input");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const question_types = ['TYPE_1', 'TYPE_2', 'TYPE_3', 'TYPE_4'];
let CreateQuestionInput = exports.CreateQuestionInput = class CreateQuestionInput {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(question_types, { message: "only type 1/2/3/4" }),
    __metadata("design:type", String)
], CreateQuestionInput.prototype, "question_type", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionInput.prototype, "question_content", void 0);
__decorate([
    (0, graphql_1.Field)(() => [create_answer_input_1.CreateAnswerInput]),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_answer_input_1.CreateAnswerInput),
    __metadata("design:type", Array)
], CreateQuestionInput.prototype, "answers", void 0);
exports.CreateQuestionInput = CreateQuestionInput = __decorate([
    (0, graphql_1.InputType)()
], CreateQuestionInput);
let checkQuestionInput = exports.checkQuestionInput = class checkQuestionInput {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], checkQuestionInput.prototype, "question_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.Int], { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], checkQuestionInput.prototype, "answer_ids", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], checkQuestionInput.prototype, "textAnswer", void 0);
exports.checkQuestionInput = checkQuestionInput = __decorate([
    (0, graphql_1.InputType)()
], checkQuestionInput);
//# sourceMappingURL=create-question.input.js.map