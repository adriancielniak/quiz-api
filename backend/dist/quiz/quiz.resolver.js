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
exports.QuizResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const quiz_service_1 = require("./quiz.service");
const quiz_entity_1 = require("./entities/quiz.entity");
const create_quiz_input_1 = require("./dto/create-quiz.input");
const create_question_input_1 = require("../question/dto/create-question.input");
let QuizResolver = exports.QuizResolver = class QuizResolver {
    constructor(quizService) {
        this.quizService = quizService;
    }
    createQuiz(createQuizInput) {
        return this.quizService.createQuiz(createQuizInput);
    }
    async findAllQuizzes() {
        return this.quizService.findAllQuizzes();
    }
    async findQuiz(quiz_id) {
        return this.quizService.findQuiz(quiz_id);
    }
    async checkAnswers(quiz_id, student_answers) {
        return this.quizService.checkAnswers(quiz_id, student_answers);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => quiz_entity_1.Quiz),
    __param(0, (0, graphql_1.Args)('createQuizInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_quiz_input_1.CreateQuizInput]),
    __metadata("design:returntype", void 0)
], QuizResolver.prototype, "createQuiz", null);
__decorate([
    (0, graphql_1.Query)(() => [quiz_entity_1.Quiz], { name: 'findAllQuizzes' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuizResolver.prototype, "findAllQuizzes", null);
__decorate([
    (0, graphql_1.Query)(() => quiz_entity_1.Quiz, { name: 'findQuiz' }),
    __param(0, (0, graphql_1.Args)('quiz_id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuizResolver.prototype, "findQuiz", null);
__decorate([
    (0, graphql_1.Query)(() => quiz_entity_1.QuizResult),
    __param(0, (0, graphql_1.Args)('quiz_id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('student_answers', { type: () => [create_question_input_1.checkQuestionInput] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", Promise)
], QuizResolver.prototype, "checkAnswers", null);
exports.QuizResolver = QuizResolver = __decorate([
    (0, graphql_1.Resolver)(() => quiz_entity_1.Quiz),
    __metadata("design:paramtypes", [quiz_service_1.QuizService])
], QuizResolver);
//# sourceMappingURL=quiz.resolver.js.map