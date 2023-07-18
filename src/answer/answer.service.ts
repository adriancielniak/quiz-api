import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { DeepPartial } from 'typeorm';
import { CreateAnswerInput } from './dto/create-answer.input';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ){}

  async createAnswer(createAnswerInput: CreateAnswerInput): Promise <Answer>{
    const {question_id, answer_content, is_correct, priority } = createAnswerInput;

    const answer: DeepPartial<Answer> = {
      question: {id: question_id},
      answer_content,
      is_correct,
      priority,
    };

    const savedAnswer = await this.answerRepository.save(answer);

    return savedAnswer;
  }

  async getAnswers(questionId: number): Promise <Answer[]>{
      return this.answerRepository.find({where:{ question: { id: questionId } }})
  }
}
