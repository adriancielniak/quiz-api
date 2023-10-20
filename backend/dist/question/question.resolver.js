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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const question_service_1 = require("./question.service");
const question_entity_1 = require("./entities/question.entity");
let QuestionResolver = exports.QuestionResolver = class QuestionResolver {
    constructor(questionService) {
        this.questionService = questionService;
    }
    async getAllQuestions() {
        return this.questionService.getAllQuestions();
    }
    async findQuizQuestions(quiz_id) {
        return this.questionService.findQuizQuestions(quiz_id);
    }
    async findFullQuestions(quiz_id) {
        return this.questionService.findFullQuestions(quiz_id);
    }
};
__decorate([
    (0, graphql_1.Query)(() => [question_entity_1.Question], { name: 'getAllQuestions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuestionResolver.prototype, "getAllQuestions", null);
__decorate([
    (0, graphql_1.Query)(() => [question_entity_1.Question], { name: "findQuizQuestions" }),
    __param(0, (0, graphql_1.Args)('quiz_id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuestionResolver.prototype, "findQuizQuestions", null);
__decorate([
    (0, graphql_1.Query)(() => [question_entity_1.Question], { name: "findFullQuestions" }),
    __param(0, (0, graphql_1.Args)('quiz_id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuestionResolver.prototype, "findFullQuestions", null);
exports.QuestionResolver = QuestionResolver = __decorate([
    (0, graphql_1.Resolver)(() => question_entity_1.Question),
    __metadata("design:paramtypes", [question_service_1.QuestionService])
], QuestionResolver);
//# sourceMappingURL=question.resolver.js.map