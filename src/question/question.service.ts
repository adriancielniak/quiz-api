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

  async createQuestion(quiz_id: number, createQuestionInput: CreateQuestionInput): Promise<Question>{
    const {question_type, question_content, answers} = createQuestionInput;

    const question = this.questionRepository.create({question_type, question_content});
    const savedQuestion = await this.questionRepository.save(question);
    savedQuestion.answers = [];

    for (const answer of answers) {
      const savedAnswer = await this.answerService.createAnswer(savedQuestion.id, answer);
      savedQuestion.answers.push(savedAnswer)
    }

    return savedQuestion;
  }

  async getQuestions(quiz_id: number): Promise <Question[]>{
      return this.questionRepository.find({where: {quiz: {id: quiz_id}}});
  }

  async getAllQuizzes(): Promise<Question[]> {
    return this.questionRepository.find();
}
}
