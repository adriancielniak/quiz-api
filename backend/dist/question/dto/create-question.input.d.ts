import { CreateAnswerInput } from 'src/answer/dto/create-answer.input';
export declare class CreateQuestionInput {
    question_type: string;
    question_content: string;
    answers: CreateAnswerInput[];
}
export declare class checkQuestionInput {
    question_id: number;
    answer_ids?: number[];
    textAnswer?: string;
}
