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
exports.QuizResult = exports.Quiz = void 0;
const graphql_1 = require("@nestjs/graphql");
const question_entity_1 = require("../../question/entities/question.entity");
const typeorm_1 = require("typeorm");
let Quiz = exports.Quiz = class Quiz {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Quiz.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], Quiz.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => [question_entity_1.Question]),
    (0, typeorm_1.OneToMany)(() => question_entity_1.Question, (question) => question.quiz, { eager: true }),
    __metadata("design:type", Array)
], Quiz.prototype, "questions", void 0);
exports.Quiz = Quiz = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], Quiz);
let QuizResult = exports.QuizResult = class QuizResult {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], QuizResult.prototype, "quiz_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => [question_entity_1.QuestionResult]),
    __metadata("design:type", Array)
], QuizResult.prototype, "questions", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], QuizResult.prototype, "result", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], QuizResult.prototype, "maxResult", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], QuizResult.prototype, "perecentage_points", void 0);
exports.QuizResult = QuizResult = __decorate([
    (0, graphql_1.ObjectType)()
], QuizResult);
//# sourceMappingURL=quiz.entity.js.map