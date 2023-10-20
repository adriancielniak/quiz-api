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
exports.QuestionResult = exports.Question = void 0;
const graphql_1 = require("@nestjs/graphql");
const answer_entity_1 = require("../../answer/entities/answer.entity");
const quiz_entity_1 = require("../../quiz/entities/quiz.entity");
const typeorm_1 = require("typeorm");
let Question = exports.Question = class Question {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Question.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => quiz_entity_1.Quiz),
    (0, typeorm_1.ManyToOne)(() => quiz_entity_1.Quiz, (quiz) => quiz.questions),
    __metadata("design:type", quiz_entity_1.Quiz)
], Question.prototype, "quiz", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], Question.prototype, "question_type", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], Question.prototype, "question_content", void 0);
__decorate([
    (0, graphql_1.Field)(() => [answer_entity_1.Answer]),
    (0, typeorm_1.OneToMany)(() => answer_entity_1.Answer, (answer) => answer.question, { eager: true }),
    __metadata("design:type", Array)
], Question.prototype, "answers", void 0);
exports.Question = Question = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], Question);
let QuestionResult = exports.QuestionResult = class QuestionResult {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], QuestionResult.prototype, "question_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], QuestionResult.prototype, "question_content", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], QuestionResult.prototype, "question_type", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.Int], { nullable: true }),
    __metadata("design:type", Array)
], QuestionResult.prototype, "student_answer_ids", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.Int], { nullable: true }),
    __metadata("design:type", Array)
], QuestionResult.prototype, "correct_answer_ids", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], QuestionResult.prototype, "student_text_answer", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], QuestionResult.prototype, "correct_text_answer", void 0);
exports.QuestionResult = QuestionResult = __decorate([
    (0, graphql_1.ObjectType)()
], QuestionResult);
//# sourceMappingURL=question.entity.js.map