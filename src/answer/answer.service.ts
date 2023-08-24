import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { CreateAnswerInput } from './dto/create-answer.input';
import { Question } from 'src/question/entities/question.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    private dataSource: DataSource
  ){}

  async createAnswer(question_id: number, createAnswerInput: CreateAnswerInput): Promise <Answer>{
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    const answer = this.answerRepository.create({ ...createAnswerInput})
    answer.question = await queryRunner.manager.findOne(Question, { where: { id: question_id } })

    await queryRunner.release();

    return answer;
  }

  async getAnswers(questionId: number): Promise <Answer[]>{
      return this.answerRepository.find({where:{ question: {id: questionId }}})
  }
}
