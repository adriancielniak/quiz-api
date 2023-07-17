import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';
import { Question } from 'src/question/entities/question.entity';
import { QuestionService } from 'src/question/question.service';

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private readonly quizRepository: Repository<Quiz>,
        private readonly questionService: QuestionService,
      ) {}
    
    async createQuiz(title: string, questions: { question_content: string, question_type: string, answers:
    { answer_content: string, is_correct?: boolean, priority?: number }[] }[]): Promise <Quiz>{
        const quiz = this.quizRepository.create({title});
        const savedQuiz = await this.quizRepository.save(quiz);

        for(const temp_question of questions){
            await this.questionService.createQuestion
            (savedQuiz.id, temp_question.question_content, temp_question.question_type, temp_question.answers);
        }

        return savedQuiz;
    }

    async getAllQuizzes(): Promise<Quiz[]> {
        return this.quizRepository.find();
      }
    
    async getQuestionsForQuiz(quizId: number): Promise<Question[]> {
        return this.questionService.getQuestions(quizId);
    }
}
