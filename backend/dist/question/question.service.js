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
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const question_entity_1 = require("./entities/question.entity");
const typeorm_2 = require("typeorm");
const answer_service_1 = require("../answer/answer.service");
let QuestionService = exports.QuestionService = class QuestionService {
    constructor(questionRepository, answerService) {
        this.questionRepository = questionRepository;
        this.answerService = answerService;
    }
    async createQuestion(quiz, createQuestionInput, queryRunner) {
        const { question_type, question_content, answers } = createQuestionInput;
        try {
            const question = this.questionRepository.create({ question_content, question_type });
            question.answers = [];
            question.quiz = quiz;
            const savedQuestion = await queryRunner.manager.save(question);
            for (const answer of answers) {
                if (question_type === 'TYPE_3' && answer.is_correct != null) {
                    throw new common_1.BadRequestException('A question of type 3 has only a priority field.');
                }
                if ((question_type === 'TYPE_1' || question_type === 'TYPE_2') && answer.priority != null) {
                    throw new common_1.BadRequestException('A question of type 1/2 has only an is_correct field.');
                }
                if ((question_type === 'TYPE_4') && (answer.priority != null || answer.is_correct != null)) {
                    throw new common_1.BadRequestException('A question of type 4 should not has a priority or is_correct field.');
                }
                let answerToSave = await this.answerService.createAnswer(savedQuestion, answer);
                answerToSave = await queryRunner.manager.save(answerToSave);
                savedQuestion.answers.push(answerToSave);
            }
            return savedQuestion;
        }
        catch (err) {
            throw err;
        }
    }
    async findQuizQuestions(quiz_id) {
        return this.questionRepository.find({ where: { quiz: { id: quiz_id } } });
    }
    async findFullQuestions(quiz_id) {
        const questions = await this.questionRepository.find({ where: { quiz: { id: quiz_id } } });
        for (const question of questions) {
            if (question.question_type === "TYPE_4") {
                question.answers = [];
            }
            else {
                question.answers = await this.answerService.getAnswers(question.id);
            }
        }
        return questions;
    }
    async getAllQuestions() {
        return this.questionRepository.find();
    }
};
exports.QuestionService = QuestionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(question_entity_1.Question)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        answer_service_1.AnswerService])
], QuestionService);
//# sourceMappingURL=question.service.js.map