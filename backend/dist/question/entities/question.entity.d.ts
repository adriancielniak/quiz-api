import { Answer } from 'src/answer/entities/answer.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';
export declare class Question {
    id: number;
    quiz: Quiz;
    question_type: string;
    question_content: string;
    answers: Answer[];
}
export declare class QuestionResult {
    question_id: number;
    question_content: string;
    question_type: string;
    student_answer_ids?: number[];
    correct_answer_ids?: number[];
    student_text_answer?: string;
    correct_text_answer?: string;
}
