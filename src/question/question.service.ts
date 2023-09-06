import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QueryRunner, Repository } from 'typeorm';
import { AnswerService } from 'src/answer/answer.service';
import { CreateQuestionInput } from './dto/create-question.input';
import { Quiz } from 'src/quiz/entities/quiz.entity';

@Injectable()
export class QuestionService{
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    private readonly answerService: AnswerService,
  ){}

  async createQuestion(quiz: Quiz, createQuestionInput: CreateQuestionInput, queryRunner:QueryRunner): Promise<Question>{
    const {question_type, question_content, answers} = createQuestionInput; 

    try{
      const question = this.questionRepository.create({ question_content, question_type})

      question.answers = []
      question.quiz = quiz;

      const savedQuestion = await queryRunner.manager.save(question)
      
      for (const answer of answers) {
        if(question_type === 'TYPE_3' && answer.is_correct != null){
          throw new BadRequestException('A question of type 3 has only a priority field.')
        }

        if((question_type === 'TYPE_1' || question_type === 'TYPE_2') && answer.priority != null){
          throw new BadRequestException('A question of type 1/2 has only an is_correct field.')
        }

        if((question_type === 'TYPE_4') && (answer.priority != null || answer.is_correct != null)){
          throw new BadRequestException('A question of type 4 should not has a priority or is_correct field.')
        }

        let answerToSave = await this.answerService.createAnswer(savedQuestion, answer);
        answerToSave = await queryRunner.manager.save(answerToSave)
        savedQuestion.answers.push(answerToSave)
      }

      return savedQuestion
    }
    catch(err){
      throw err;
    } 
  }

  async findQuizQuestions(quiz_id: number): Promise <Question[]>{
      return this.questionRepository.find({where: {quiz: {id: quiz_id}}});
  }

  async findFullQuestions(quiz_id: number): Promise <Question[]>{
    const questions = await this.questionRepository.find({where: {quiz: {id: quiz_id}}});

    for(const question of questions){
      if(question.question_type === "TYPE_4"){
        question.answers = [];
      }else{
        question.answers = await this.answerService.getAnswers(question.id);
      }
    }

    return questions;
  }

  async getAllQuestions(): Promise<Question[]> {
    return this.questionRepository.find();
}
}
