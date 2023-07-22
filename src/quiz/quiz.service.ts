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
        savedQuiz.questions = [];

        for(const question of questions){ 
            const savedQuestion = await this.questionService.createQuestion(savedQuiz.id, question);
            savedQuiz.questions.push(savedQuestion);
        }
        await this.quizRepository.save(savedQuiz);

        return savedQuiz;
    }

    async getAllQuizzes(): Promise<Quiz[]> {
        return this.quizRepository.find();
    }
}
