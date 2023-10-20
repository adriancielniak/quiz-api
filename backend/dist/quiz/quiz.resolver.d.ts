import { QuizService } from './quiz.service';
import { Quiz, QuizResult } from './entities/quiz.entity';
import { CreateQuizInput } from './dto/create-quiz.input';
import { checkQuestionInput } from 'src/question/dto/create-question.input';
export declare class QuizResolver {
    private readonly quizService;
    constructor(quizService: QuizService);
    createQuiz(createQuizInput: CreateQuizInput): Promise<Quiz>;
    findAllQuizzes(): Promise<Quiz[]>;
    findQuiz(quiz_id: number): Promise<Quiz>;
    checkAnswers(quiz_id: number, student_answers: checkQuestionInput[]): Promise<QuizResult>;
}
