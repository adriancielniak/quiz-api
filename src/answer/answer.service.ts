import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { CreateAnswerInput } from './dto/create-answer.input';
import { Question } from 'src/question/entities/question.entity';
import { QuestionService } from 'src/question/question.service';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ){}

  async createAnswer(question: Question, createAnswerInput: CreateAnswerInput): Promise <Answer>{
    const answer = this.answerRepository.create({ ...createAnswerInput });

    answer.question = question;

    return answer;
  }

  async getAnswers(questionId: number): Promise <Answer[]>{
      return this.answerRepository.find({where:{ question: {id: questionId }}})
  }
}
