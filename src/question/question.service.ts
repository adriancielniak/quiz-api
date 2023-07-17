import { forwardRef, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from 'src/answer/entities/answer.entity';
import { Question } from './entities/question.entity';
import { DeepPartial, Repository } from 'typeorm';
import { AnswerService } from 'src/answer/answer.service';
import { Inject } from '@nestjs/common';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @Inject(forwardRef(() => AnswerService))
    private readonly answerRepository: Repository<Answer>,
  ) {}

  async createQuestion(quiz_id: number, question_content: string, question_type: string, answers:{answer_content: string, is_correct?: boolean, priority?: number}[]): Promise<Question>{
    const question: DeepPartial<Question> = {
      quiz: {id:quiz_id},
      question_content,
      question_type
    }

    const savedQuestion = await this.questionRepository.save(question);

    const answersEntities = answers.map(answer => {
      const answerPartial: DeepPartial<Answer> = {
        answer_content: answer.answer_content,
        is_correct: answer.is_correct,
        priority: answer.priority,
        question: {id: savedQuestion.id}
      };
      return this.answerRepository.create(answerPartial);
    });

    await this.answerRepository.save(answersEntities);

    return savedQuestion;
  }

  async getQuestions(quiz_id: number): Promise <Question[]>{
      return this.questionRepository.find({where: {quiz: {id: quiz_id}}});
  }
}
