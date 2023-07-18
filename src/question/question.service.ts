import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { DeepPartial, Repository } from 'typeorm';
import { AnswerService } from 'src/answer/answer.service';
import { CreateQuestionInput } from './dto/create-question.input';
import { CreateAnswerInput } from 'src/answer/dto/create-answer.input';

@Injectable()
export class QuestionService{
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    private readonly answerService: AnswerService,
  ){}

  async createQuestion(createQuestionInput: CreateQuestionInput): Promise<Question>{
    const {quiz_id, question_type, question_content, answers} = createQuestionInput;

    const question: DeepPartial<Question> = {
      quiz: {id: quiz_id},
      question_content,
      question_type
    }

    const savedQuestion = await this.questionRepository.save(question);

    for (const answerInput of answers) {
      const answer: CreateAnswerInput = {
        ...answerInput,
        question_id: savedQuestion.id, 
      };
      await this.answerService.createAnswer(answer);
    }

    return savedQuestion;
  }

  async getQuestions(quiz_id: number): Promise <Question[]>{
      return this.questionRepository.find({where: {quiz: {id: quiz_id}}});
  }
}
