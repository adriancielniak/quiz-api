import { Question } from './entities/question.entity';
import { QueryRunner, Repository } from 'typeorm';
import { AnswerService } from 'src/answer/answer.service';
import { CreateQuestionInput } from './dto/create-question.input';
import { Quiz } from 'src/quiz/entities/quiz.entity';
export declare class QuestionService {
    private readonly questionRepository;
    private readonly answerService;
    constructor(questionRepository: Repository<Question>, answerService: AnswerService);
    createQuestion(quiz: Quiz, createQuestionInput: CreateQuestionInput, queryRunner: QueryRunner): Promise<Question>;
    findQuizQuestions(quiz_id: number): Promise<Question[]>;
    findFullQuestions(quiz_id: number): Promise<Question[]>;
    getAllQuestions(): Promise<Question[]>;
}
