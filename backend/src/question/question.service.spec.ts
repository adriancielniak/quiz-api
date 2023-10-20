import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AnswerService } from 'src/answer/answer.service';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateQuestionInput } from './dto/create-question.input';
import { Question } from './entities/question.entity';
import { QuestionService } from './question.service';

jest.mock('src/answer/answer.service')

const quiz: Quiz = {
  id: 1,
  title: 'title',
  questions: []
}

const question: Question = {
  id: 1,
  quiz: quiz,
  question_type: 'TYPE_1',
  question_content: 'content',
  answers: []
}

describe('QuestionService', () => {
  let service: QuestionService;
  let answerService: AnswerService;
  let dataSource: DataSource;
  let questionRepository: Repository<Question>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      
      providers: [QuestionService, AnswerService, {
        provide: getRepositoryToken(Question),
        useClass: Repository
      },
      {
        provide: DataSource,
        useValue: {
          createQueryRunner: jest.fn(() => ({
            manager: {
              findOne: jest.fn().mockResolvedValue(quiz),
              save: jest.fn().mockResolvedValue(question)
           },
              connect: jest.fn(),
              startTransaction: jest.fn(),
              commitTransaction: jest.fn(),
              rollbackTransaction: jest.fn(),
              release: jest.fn(),
            })),
        },
      },]
    }).compile();

    service = module.get<QuestionService>(QuestionService)
    questionRepository = module.get<Repository<Question>>(getRepositoryToken(Question));
    answerService = module.get<AnswerService>(AnswerService);
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(answerService).toBeDefined();
  })

  it('should be defined', () => {
    expect(questionRepository).toBeDefined();
  })

  describe('createQuestions' , () => {
    it('should create and return new question ', async () =>{
        const question_input: CreateQuestionInput = {
          question_type: 'TYPE_1',
          question_content: 'content',
          answers: []
        }

        const questionWithoutId: Question = {
          id: 1,
          quiz: quiz,
          question_type: 'TYPE_1',
          question_content: 'content',
          answers: []
        }

        jest.spyOn(questionRepository, 'create').mockReturnValueOnce(questionWithoutId);

        jest.spyOn(questionRepository, 'save').mockResolvedValueOnce(question);

        const queryRunner = dataSource.createQueryRunner()

        const result = await service.createQuestion(quiz, question_input, queryRunner);

        expect(result).toEqual(question);

    })

    it('should return error', async ()=> {
      const question_input: CreateQuestionInput = {
        question_type: 'TYPE_1',
        question_content: 'content',
        answers: [{
          answer_content: "content",
          priority: 1,
          is_correct: null 
        }]
      }

      const question_result: Question = {
        id: 1,
        question_content: 'content',
        question_type: 'TYPE_1',
        quiz: null,
        answers: []
      }

      jest.spyOn(questionRepository, 'create').mockReturnValueOnce(question_result);

      jest.spyOn(questionRepository, 'save').mockResolvedValueOnce(question_result);

      const queryRunner = dataSource.createQueryRunner()

      try{
        await service.createQuestion(null, question_input, queryRunner);
      }
      catch (BadRequestException){
        expect(BadRequestException.message).toBe('A question of type 1/2 has only an is_correct field.');
      }
    })

    it('should return error', async () => {
      const question_input: CreateQuestionInput = {
        question_type: 'TYPE_4',
        question_content: 'content',
        answers: [{
          answer_content: "content",
          priority: 1,
        }]
      }

      const question_result: Question = {
        id: 1,
        question_content: 'content',
        question_type: 'TYPE_4',
        quiz: null,
        answers: []
      }

      jest.spyOn(questionRepository, 'create').mockReturnValueOnce(question_result);

      jest.spyOn(questionRepository, 'save').mockResolvedValueOnce(question_result);

      const queryRunner = dataSource.createQueryRunner()

      try{
        await service.createQuestion(null, question_input, queryRunner);
      }
      catch (BadRequestException){
        expect(BadRequestException.message).toBe('A question of type 4 should not has a priority or is_correct field.');
      }
    })

    it('should return error', async () => {
      const question_input: CreateQuestionInput = {
        question_type: 'TYPE_2',
        question_content: 'content',
        answers: [{
          answer_content: "content",
          is_correct: true,
          priority: 1,
        }]
      }

      const question_result: Question = {
        id: 1,
        question_content: 'content',
        question_type: 'TYPE_2',
        quiz: null,
        answers: []
      }

      jest.spyOn(questionRepository, 'create').mockReturnValueOnce(question_result);

      jest.spyOn(questionRepository, 'save').mockResolvedValueOnce(question_result);

      const queryRunner = dataSource.createQueryRunner()

      try{
        await service.createQuestion(null, question_input, queryRunner);
      }
      catch (BadRequestException){
        expect(BadRequestException.message).toBe('A question of type 1/2 has only an is_correct field.');
      }
    })

    it('should return error', async () => {
      const question_input: CreateQuestionInput = {
        question_type: 'TYPE_3',
        question_content: 'content',
        answers: [{
          answer_content: "content",
          is_correct: true,
          priority: 1
        }]
      }

      const question_result: Question = {
        id: 1,
        question_content: 'content',
        question_type: 'TYPE_3',
        quiz: null,
        answers: []
      }

      jest.spyOn(questionRepository, 'create').mockReturnValueOnce(question_result);

      jest.spyOn(questionRepository, 'save').mockResolvedValueOnce(question_result);

      const queryRunner = dataSource.createQueryRunner()

      try{
        await service.createQuestion(null, question_input, queryRunner);
      }
      catch (BadRequestException){
        expect(BadRequestException.message).toBe('A question of type 3 has only a priority field.');
      }
    })
  })



  describe('getQuizQuestions', () => {
    it('should return questions for the specific quiz', async () =>{
      const quiz_id = 1;

      const questions: Question []= [
        {
          id: 1,
          question_content: 'Who was played with 7?',
          question_type: 'TYPE_1',
          quiz: null,
          answers: []
        },{
          id: 2,
          question_content: 'Which city in poland has the most people',
          question_type: 'TYPE_4',
          quiz: null,
          answers: []
        }
      ]

      jest.spyOn(questionRepository, 'find').mockResolvedValueOnce(questions);

      const result = await service.findQuizQuestions(quiz_id)

      expect(result).toEqual(questions);
    })
  })

  describe('getFullQuestions', () => {
    it('should return questions with answers for the specific quiz', async () =>{
      const quiz_id = 1;

      const questions: Question []= [
        {
          id: 1,
          question_content: 'Who was played with 7?',
          question_type: 'TYPE_2',
          quiz: null,
          answers: [
            { id: 1, answer_content: 'Cristiano Ronaldo', question: null, is_correct: true },
            { id: 2, answer_content: 'Lionel Messi', question: null, is_correct: false },
            { id: 3, answer_content: 'Robert Lewandowski', question: null, is_correct: false },
            { id: 4, answer_content: 'Kylian Mbappe', question: null, is_correct: true },
          ]
        },{
          id: 2,
          question_content: 'Which city in poland has the most people',
          question_type: 'TYPE_4',
          quiz: null,
          answers: [
          ]
        }
      ]

      jest.spyOn(questionRepository, 'find').mockResolvedValueOnce(questions);

      const result = await service.findFullQuestions(quiz_id)

      expect(result).toEqual(questions);
    })
  })

  describe('getAllQuestions', () => {
    it('should return all Questions', async () =>{

      const questions: Question []= [
        {
          id: 1,
          question_content: 'Who was played with 7?',
          question_type: 'TYPE_2',
          quiz: null,
          answers: []
        },{
          id: 2,
          question_content: 'Which city in poland has the most people',
          question_type: 'TYPE_4',
          quiz: null,
          answers: []
        }
      ]

      jest.spyOn(questionRepository, 'find').mockResolvedValueOnce(questions);

      const result = await service.getAllQuestions();

      expect(result).toEqual(questions);
    })
  })
});
