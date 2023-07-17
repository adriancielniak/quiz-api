import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { DeepPartial } from 'typeorm';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ){}

  async createAnswer(questionId: number, answer_content: string, is_correct?: boolean, priority?: number): Promise <Answer>{
    const answer: DeepPartial<Answer> = {
      answer_content,
      is_correct,
      priority,
    };

    const savedAnswer = await this.answerRepository.save(answer);

    await this.answerRepository
      .createQueryBuilder()
      .relation(Answer, 'question')
      .of(savedAnswer.id)
      .set(questionId);

    return savedAnswer;
  }

  async getAnswers(questionId: number): Promise <Answer[]>{
      return this.answerRepository.find({where:{ question: { id: questionId } }})
  }
}
