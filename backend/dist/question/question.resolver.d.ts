import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
export declare class QuestionResolver {
    private readonly questionService;
    constructor(questionService: QuestionService);
    getAllQuestions(): Promise<Question[]>;
    findQuizQuestions(quiz_id: number): Promise<Question[]>;
    findFullQuestions(quiz_id: number): Promise<Question[]>;
}
