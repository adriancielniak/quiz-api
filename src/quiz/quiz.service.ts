import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';
import { Question } from 'src/question/entities/question.entity';
import { QuestionService } from 'src/question/question.service';
import { CreateQuizInput } from './dto/create-quiz.input';
import { CreateQuestionInput } from 'src/question/dto/create-question.input';

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private readonly quizRepository: Repository<Quiz>,
        private readonly questionService: QuestionService,
      ) {}
    
    
    async createQuiz(createQuizInput: CreateQuizInput): Promise <Quiz>{
        const {title, questions} = createQuizInput;

        const quiz = this.quizRepository.create({title});
        const savedQuiz = await this.quizRepository.save(quiz);

        for(const questionInput of questions){ 
            
            const question: CreateQuestionInput = { ...questionInput, quiz_id: savedQuiz.id };
            await this.questionService.createQuestion(question);
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
