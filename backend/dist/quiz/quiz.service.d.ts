import { Quiz, QuizResult } from './entities/quiz.entity';
import { DataSource, Repository } from 'typeorm';
import { Question } from 'src/question/entities/question.entity';
import { QuestionService } from 'src/question/question.service';
import { CreateQuizInput } from './dto/create-quiz.input';
import { checkQuestionInput } from 'src/question/dto/create-question.input';
export declare class QuizService {
    private readonly quizRepository;
    private readonly questionService;
    private dataSource;
    constructor(quizRepository: Repository<Quiz>, questionService: QuestionService, dataSource: DataSource);
    createQuiz(createQuizInput: CreateQuizInput): Promise<Quiz>;
    checkType1(student_answer: checkQuestionInput, question: Question): Promise<boolean>;
    checkType2(student_answer: checkQuestionInput, question: Question): Promise<boolean>;
    checkType3(student_answer: checkQuestionInput, question: Question): Promise<boolean>;
    checkType4(student_answer: checkQuestionInput, question: Question): Promise<boolean>;
    checkAnswers(quiz_id: number, student_answers: checkQuestionInput[]): Promise<QuizResult>;
    findQuiz(quiz_id: number): Promise<Quiz>;
    findAllQuizzes(): Promise<Quiz[]>;
}
