import { Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { CreateAnswerInput } from './dto/create-answer.input';
import { Question } from 'src/question/entities/question.entity';
export declare class AnswerService {
    private readonly answerRepository;
    constructor(answerRepository: Repository<Answer>);
    createAnswer(question: Question, createAnswerInput: CreateAnswerInput): Promise<Answer>;
    getAnswers(questionId: number): Promise<Answer[]>;
}
