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
exports.QuizService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const quiz_entity_1 = require("./entities/quiz.entity");
const typeorm_2 = require("typeorm");
const question_service_1 = require("../question/question.service");
let QuizService = exports.QuizService = class QuizService {
    constructor(quizRepository, questionService, dataSource) {
        this.quizRepository = quizRepository;
        this.questionService = questionService;
        this.dataSource = dataSource;
    }
    async createQuiz(createQuizInput) {
        const { title, questions } = createQuizInput;
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const quiz = this.quizRepository.create({ title });
            quiz.questions = [];
            const savedQuiz = await queryRunner.manager.save(quiz);
            for (const question of questions) {
                let questionToSave = await this.questionService.createQuestion(quiz, question, queryRunner);
                questionToSave = await queryRunner.manager.save(questionToSave);
                savedQuiz.questions.push(questionToSave);
            }
            await queryRunner.commitTransaction();
            return savedQuiz;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw new Error(err);
        }
        finally {
            await queryRunner.release();
        }
    }
    async checkType1(student_answer, question) {
        const correct_answer = question.answers.find((answer) => answer.is_correct);
        return !!correct_answer && correct_answer.id === student_answer.answer_ids[0];
    }
    async checkType2(student_answer, question) {
        const correct_answer_ids = question.answers.filter((answer) => answer.is_correct).map((answer) => answer.id);
        return (student_answer.answer_ids.length === correct_answer_ids.length &&
            student_answer.answer_ids.every((answer_id) => correct_answer_ids.includes(answer_id)));
    }
    async checkType3(student_answer, question) {
        const correct_answer_ids = question.answers.sort((first, second) => first.priority - second.priority).map((answer) => answer.id);
        return (student_answer.answer_ids.length === correct_answer_ids.length &&
            student_answer.answer_ids.every((answer_id, index) => answer_id === correct_answer_ids[index]));
    }
    async checkType4(student_answer, question) {
        const correct_text_answer = question.answers[0].answer_content;
        return student_answer.textAnswer.toLowerCase() === correct_text_answer.toLowerCase();
    }
    async checkAnswers(quiz_id, student_answers) {
        const quiz = await this.findQuiz(quiz_id);
        let total_questions = 0;
        let correct_answers = 0;
        if (quiz && quiz.questions) {
            total_questions = quiz.questions.length;
            const questions_result = [];
            for (const question of quiz.questions) {
                const student_answer = student_answers.find((answer) => answer.question_id === question.id);
                const singleResult = {
                    question_id: question.id,
                    question_type: question.question_type,
                    question_content: question.question_content
                };
                if (question.question_type === 'TYPE_1') {
                    singleResult.student_answer_ids = student_answer.answer_ids;
                    singleResult.correct_answer_ids = question.answers.filter((answer) => (answer.is_correct)).map((answer) => answer.id);
                    if (await this.checkType1(student_answer, question)) {
                        correct_answers++;
                    }
                }
                else if (question.question_type === 'TYPE_2') {
                    singleResult.student_answer_ids = student_answer.answer_ids;
                    singleResult.correct_answer_ids = question.answers.filter((answer) => (answer.is_correct)).map((answer) => answer.id);
                    if (await this.checkType2(student_answer, question)) {
                        correct_answers++;
                    }
                }
                else if (question.question_type === 'TYPE_3') {
                    singleResult.student_answer_ids = student_answer.answer_ids;
                    singleResult.correct_answer_ids = question.answers.sort((first, second) => first.priority - second.priority).map((answer) => answer.id);
                    if (await this.checkType3(student_answer, question)) {
                        correct_answers++;
                    }
                }
                else if (question.question_type === 'TYPE_4') {
                    singleResult.student_text_answer = student_answer.textAnswer;
                    singleResult.correct_text_answer = question.answers[0].answer_content;
                    if (await this.checkType4(student_answer, question)) {
                        correct_answers++;
                    }
                }
                questions_result.push(singleResult);
            }
            const percentage = Math.round((correct_answers / total_questions) * 100);
            const result = {
                quiz_id: quiz_id,
                questions: questions_result,
                result: correct_answers,
                maxResult: total_questions,
                perecentage_points: percentage
            };
            return result;
        }
        else {
            throw new Error('quiz not found or questions not found');
        }
    }
    async findQuiz(quiz_id) {
        const quiz = await this.quizRepository
            .createQueryBuilder('quiz')
            .leftJoinAndSelect('quiz.questions', 'question')
            .leftJoinAndSelect('question.answers', 'answer')
            .where('quiz.id = :id', { id: quiz_id })
            .getOne();
        if (!quiz) {
            throw new Error('quiz not found');
        }
        return quiz;
    }
    async findAllQuizzes() {
        return this.quizRepository.find();
    }
};
exports.QuizService = QuizService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(quiz_entity_1.Quiz)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        question_service_1.QuestionService,
        typeorm_2.DataSource])
], QuizService);
//# sourceMappingURL=quiz.service.js.map