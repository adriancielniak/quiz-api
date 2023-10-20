import { Question } from 'src/question/entities/question.entity';
export declare class Answer {
    id: number;
    question: Question;
    answer_content: string;
    priority?: number;
    is_correct?: boolean;
}
