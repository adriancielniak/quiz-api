import { Question, QuestionResult } from 'src/question/entities/question.entity';
export declare class Quiz {
    id: number;
    title: string;
    questions: Question[];
}
export declare class QuizResult {
    quiz_id: number;
    questions: QuestionResult[];
    result: number;
    maxResult: number;
    perecentage_points: number;
}
