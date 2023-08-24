import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { DataSource, Repository } from 'typeorm';
import { AnswerService } from 'src/answer/answer.service';
import { CreateQuestionInput } from './dto/create-question.input';
import { Quiz } from 'src/quiz/entities/quiz.entity';

@Injectable()
export class QuestionService{
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    private readonly answerService: AnswerService,
    private dataSource: DataSource
  ){}

  async createQuestion(quiz_id: number, createQuestionInput: CreateQuestionInput): Promise<Question>{
    const {question_type, question_content, answers} = createQuestionInput; 

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try{
      const question = this.questionRepository.create({ question_content, question_type})

      question.quiz = await queryRunner.manager.findOne(Quiz, { where: { id: quiz_id } })
      question.answers = []

      const savedQuestion = await queryRunner.manager.save(question)
      
      for (const answer of answers) {
        let answerToSave = await this.answerService.createAnswer(savedQuestion.id, answer);
        answerToSave = await queryRunner.manager.save(answerToSave)
        savedQuestion.answers.push(answerToSave)
      }
      
      await queryRunner.commitTransaction();

      return savedQuestion
    }
    catch(err){
      await queryRunner.rollbackTransaction();
      throw new Error(err)
    } 
    finally{
      await queryRunner.release();
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
